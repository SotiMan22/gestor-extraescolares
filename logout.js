import { supabase } from "./supabaseclientes.js";

export async function logout() {
  // cerrar sesión de Supabase
  await supabase.auth.signOut();

  // limpiar invitado
  localStorage.removeItem("invitado");
  sessionStorage.removeItem("invitado");

  // redirigir correctamente
  window.location.href = "/pages/login.html";
}