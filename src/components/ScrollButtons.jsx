"use client";

export function ScrollButtonRight() {
  function scrollParentRight(e) {
    const container = e.currentTarget.parentNode;
    container.scrollLeft += container.scrollWidth * 0.35;
  }

  return (
    <div className="scroll-btn-box right" onClick={scrollParentRight}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}

export function ScrollButtonLeft() {
  function scrollParentLeft(e) {
    const container = e.currentTarget.parentNode;
    container.scrollLeft -= container.scrollWidth * 0.35;
  }

  return (
    <div className="scroll-btn-box left" onClick={scrollParentLeft}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
}
