import { supabase } from "./supabaseclientes.js";

export async function requireRole(requiredRoles) {

  // convertir a array si no lo es
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = [requiredRoles];
  }

  // comprobar invitado
  const invitado = localStorage.getItem("invitado");

  // 1️⃣ Esperar a que Supabase cargue la sesión inicial
  const { data: sessionData } = await supabase.auth.getSession();
  let session = sessionData.session;
  let user = session?.user;

  // 2️⃣ Si no hay usuario todavía, intentar obtenerlo
  if (!user) {
    const { data: userData } = await supabase.auth.getUser();
    user = userData.user;
  }

  // 3️⃣ Si no hay usuario ni invitado → login
  if (!user && !invitado) {
    location.href = "login.html";
    return;
  }

  // 4️⃣ Si es invitado
  if (invitado) {
    if (!requiredRoles.includes("invitado")) {
      location.href = "login.html";
    }
    return;
  }

  // 5️⃣ Usuario logueado → obtener rol
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    location.href = "login.html";
    return;
  }

  // 6️⃣ Rol no permitido
  if (!requiredRoles.includes(profile.role)) {
    location.href = "login.html";
  }
}
