/**
 * Date formatting utilities for consistent DD/MM/YYYY format across the site
 */

/**
 * Format a date to DD/MM/YYYY format
 * @param date - Date object, ISO string, or timestamp
 * @returns Formatted date string in DD/MM/YYYY format
 */
export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "Fecha inválida";
  }
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Format a date to DD/MM/YYYY HH:mm format
 * @param date - Date object, ISO string, or timestamp
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "Fecha inválida";
  }
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Format a date to long format in Spanish (e.g., "25 de diciembre de 2025")
 * @param date - Date object, ISO string, or timestamp
 * @returns Formatted date string in long Spanish format
 */
export function formatDateLong(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "Fecha inválida";
  }
  
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

/**
 * Convert date to YYYY-MM-DD format for HTML date inputs
 * @param date - Date object, ISO string, or timestamp
 * @returns Date string in YYYY-MM-DD format
 */
export function toInputDate(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "";
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
}

/**
 * Extract time from date in HH:mm format
 * @param date - Date object, ISO string, or timestamp
 * @returns Time string in HH:mm format
 */
export function toInputTime(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "";
  }
  
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  
  return `${hours}:${minutes}`;
}

