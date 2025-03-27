/**
 *
 * @param size tamanho em byte
 */
export const sizeCalculate = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  for (i = 0; size >= 1024 && i < 4; i++) {
    size /= 1024
  }

  return size.toFixed(2) + units[i]
}
