export function clickOutside(node: HTMLDivElement) {
  const handleClick = (event: unknown) => {
    const typedEvent = event as { target: Node; defaultPrevented: unknown };
    if (node && !node.contains(typedEvent.target) && !typedEvent.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside', node as CustomEventInit<HTMLDivElement>));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
