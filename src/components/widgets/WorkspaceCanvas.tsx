"use client";

import { Stage, Layer, Rect } from "react-konva";
import { WorkSpaceType } from "@/@types/product.type";
import WorkspaceItem from "./WorkspaceItem";
import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa6";

interface WorkspaceCanvasProps {
    items: WorkSpaceType[];
    setItems: React.Dispatch<
        React.SetStateAction<WorkSpaceType[]>
    >;
    selectedWorkItemId: string | null;
    setSelectedWorkItemId: React.Dispatch<React.SetStateAction<string | null>>;
    onDeleteWorkspaceItem: (id: string) => void;
}

export default function WorkspaceCanvas({
    items,
    selectedWorkItemId,
    setItems,
    setSelectedWorkItemId,
    onDeleteWorkspaceItem
}: WorkspaceCanvasProps) {
    const stageRef = useRef<any | null>(null);
    const [stageSize, setStageSize] = useState({
        width: 0,
        height: 0
    });

    const onDownloadHandler = () => {
        if (!stageRef.current) return;

        const uri = stageRef.current.toDataURL({
            pixelRatio: 2,
        });

        const link = document.createElement("a");

        link.download = "workspace-design.jpg";
        link.href = uri;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }

    useEffect(() => {
        const updateSize = () => {
            setStageSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener(
                "resize",
                updateSize
            );
        };
    }, []);

    return (
        <>
            <div className="w-full h-full border border-gray-200 rounded-2xl overflow-hidden">
                <Stage
                    width={stageSize.width}
                    height={stageSize.height}
                    ref={stageRef}
                >
                    <Layer>
                        {Array.from({ length: 50 }).map((_, i) => (
                            <Rect
                                key={`vertical-${i}`}
                                x={i * 40}
                                y={0}
                                width={1}
                                height={stageSize.height}
                                fill="#EEE"
                            />
                        ))}

                        {Array.from({ length: 50 }).map((_, i) => (
                            <Rect
                                key={`horizontal-${i}`}
                                x={0}
                                y={i * 40}
                                width={stageSize.width}
                                height={1}
                                fill="#EEE"
                            />
                        ))}

                        {items.map((item) => (
                            <WorkspaceItem
                                key={item.id}
                                item={item}
                                setItems={setItems}
                                selectedWorkItemId={selectedWorkItemId}
                                setSelectedWorkItemId={setSelectedWorkItemId}
                                onDeleteWorkspaceItem={onDeleteWorkspaceItem}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
            <div className="flex mt-4">
                <button onClick={onDownloadHandler} className="download-btn">
                    <span>
                        <FaDownload />
                    </span>
                    <span>SAVE AS IMAGE</span>
                </button>
            </div>
        </>
    );
}