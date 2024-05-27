"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Testcase, CodeEditor, Problem } from "../problem";
import { useRef, useState, useLayoutEffect } from "react";


interface ProblemProps {
  problemTitle: string;
}

const Resizeable: React.FC<ProblemProps> = ({ problemTitle }) => {

  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  const convertToTitle = (str: string | string[] | undefined) => {
    if (typeof str === 'string') {
      return str.replace(/-/g, ' ');
    }
    return '';
  };

  useLayoutEffect(() => {
    function handleResize() {
      if (elementRef.current) {
        const width = elementRef.current.offsetWidth;
        const height = elementRef.current.offsetHeight;
        setElementWidth(width);
        setElementHeight(height);
      }
    }

    function handleMutation(mutations: MutationRecord[]) {
      handleResize();
    }

    const observer = new MutationObserver(handleMutation);
    if (elementRef.current) {
      observer.observe(elementRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [elementRef]);

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full h-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex min-h-80 max-h-full items-center justify-center p-6">
            <Problem problemTitle={convertToTitle(problemTitle)}  />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div
                className="flex h-full items-center justify-center p-6"
                ref={elementRef}
                style={{ width: "100%", height: "100%" }}
              >
                <CodeEditor width={elementWidth} height={elementHeight} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={0}>
              <div className="flex h-full items-center justify-center p-6">
                <Testcase />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Resizeable;
