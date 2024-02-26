const nav: (HTMLElement | null)[] = [
  document.querySelector("[aria-controls='about-me']"),
  document.querySelector("[aria-controls='projects']"),
  document.querySelector("[aria-controls='get-in-touch']")
];

(function (elements: (HTMLElement | null)[]) {
  window.addEventListener('hashchange', () => {
    const value = (window.location.hash).substring(1) ?? '';
    const isValid = elements.includes(document.querySelector(`[aria-controls='${value}']`));
    if(isValid){
      const el = document.querySelector(`[aria-controls='${value}']`) as HTMLElement;
      el.click();
    }
  })

  elements.forEach((el) => {
    if(el){
      el.addEventListener('click', toggleAttributes);   
      el.addEventListener('keypress', clickOnKey);
    }
  });
})(nav);

function toggleAttributes(this: HTMLElement){
  const leftBorder: HTMLElement | null = document.querySelector('#symbol [position="left"]');
  const view: HTMLElement | null = document.getElementById(`${this.getAttribute('aria-controls')}`);
  const isExpanded = booleanConvert(this, 'aria-expanded');

  this.setAttribute('aria-expanded', JSON.stringify(!isExpanded));
  unselectSiblings(this, 'aria-expanded');

  if(view && leftBorder){
    const isSelected = booleanConvert(view, 'aria-selected');
    view.setAttribute('aria-selected', JSON.stringify(!isSelected));
    leftBorder.setAttribute('highlighted', JSON.stringify(!isSelected));
      unselectSiblings(view, 'aria-selected');
  }
  
  function unselectSiblings(element: HTMLElement | null, 
                            attribute: string ) {
    const siblings = element?.parentElement?.children;
      if(siblings){
        const notSelected = [...siblings].filter((el) => el !== element);
        notSelected.forEach((el) => {
          el.setAttribute(attribute, 'false');
        });
      }
  };

   function booleanConvert(el: HTMLElement, attribute: string): boolean{
    return JSON.parse(el.getAttribute(attribute) as string);
  }; 
}

function clickOnKey(this: HTMLElement, e: Event){
  if(e instanceof KeyboardEvent && e.key === "Enter"){
    this.click();
  }
}







