"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {Testcase, CodeEditor, Problem}  from "../problem";

const Resizeable = () => {
  return (
    <>

        <ResizablePanelGroup
          direction="horizontal"
          className=" size-full h-screen max-w-full h- rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex min-h-80 max-h-full items-center justify-center p-6">
              <Problem />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle/>
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <div className="flex h-full items-center justify-center p-6">
                  <CodeEditor />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle/>
              <ResizablePanel defaultSize={75}>
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
