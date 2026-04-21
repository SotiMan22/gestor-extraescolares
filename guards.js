import { supabase } from "./supabaseclientes.js";

export async function requireRole(requiredRoles) {

  // convertir a array si no lo es
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = [requiredRoles];
  }

  // comprobar invitado
  const invitado = localStorage.getItem("invitado");

  // obtener usuario
  const { data: { user } } = await supabase.auth.getUser();

  // ❌ no hay usuario ni invitado
  if (!user && !invitado) {
    location.href = "/pages/login.html";
    return;
  }

  // 👤 si es invitado
  if (invitado) {
    if (!requiredRoles.includes("invitado")) {
      location.href = "/pages/login.html";
    }
    return;
  }

  // 🔐 usuario logueado → obtener rol
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    location.href = "/pages/login.html";
    return;
  }

  // ❌ rol no permitido
  if (!requiredRoles.includes(profile.role)) {
    location.href = "/pages/login.html";
  }
}