export function generateUniqueId() {
    return Math.random().toString().slice(2, 34).padEnd(32, '0');
}