import { supabase } from "./supabaseclientes.js"

/* ============================================
   REGISTRO (ADMIN)
   ============================================ */

export async function register(email, password, nombre, apellidos, role) {

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw new Error(error.message);

  if (!data.user) {
    throw new Error("Usuario no creado (posible verificación por email activa)");
  }

  const esInvitado = sessionStorage.getItem("invitado") === "true";

  let userId = null;
  if (!esInvitado && user) {
    userId = user.id;
  }


  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      email,
      nombre,
      apellidos,
      role
    });

  if (profileError) throw new Error(profileError.message);

  return true;
}

/* ============================================
   LOGIN + REDIRECCIÓN
   ============================================ */

export async function login(email, password) {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw new Error(error.message);

  const esInvitado = sessionStorage.getItem("invitado") === "true";

  let userId = null;
  if (!esInvitado && user) {
    userId = user.id;
  }


  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError) throw new Error(profileError.message);

  redirigir(profile.role);
}

/* ============================================
   REDIRECCIÓN POR ROL
   ============================================ */

function redirigir(role) {
  switch (role) {
    case "admin":
      window.location.href = "admin.html";
      break;
    case "monitor":
      window.location.href = "monitor.html";
      break;
    case "familiar":
      window.location.href = "familiar.html";
      break;
    default:
      window.location.href = "login.html";
  }
}

/* ============================================
   INVITADO
   ============================================ */

export function entrarInvitado() {
  localStorage.setItem("invitado", "true");
  window.location.href = "invitado.html";
}

/* ============================================
   LOGOUT
   ============================================ */

export async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem("invitado");
  window.location.href = "login.html";
}