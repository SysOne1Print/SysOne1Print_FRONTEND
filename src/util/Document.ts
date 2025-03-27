export function btns() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.onclick = function (event: any) {
    if (event.target.className === 'modal') {
      event.target.style.display = 'none'
      document.querySelector('body')?.removeAttribute('style')
    }
  }
}
