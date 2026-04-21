import { supabase } from "./supabaseclientes.js";

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

  const userId = data.user.id;

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

  const userId = data.user.id;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError) throw new Error(profileError.message);

  redirigir(profile.role);
}

/* ============================================
   REDIRECCIÓN POR ROL (GitHub Pages)
   ============================================ */

function redirigir(role) {
  const base = "/gestor-extraescolares/";

  switch (role) {
    case "admin":
      window.location.href = base + "admin.html";
      break;
    case "monitor":
      window.location.href = base + "monitor.html";
      break;
    case "familiar":
      window.location.href = base + "familiar.html";
      break;
    default:
      window.location.href = base + "login.html";
  }
}

/* ============================================
   INVITADO
   ============================================ */

export function entrarInvitado() {
  localStorage.setItem("invitado", "true");
  window.location.href = "/gestor-extraescolares/invitado.html";
}

/* ============================================
   LOGOUT
   ============================================ */

export async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem("invitado");
  window.location.href = "/gestor-extraescolares/login.html";
}
