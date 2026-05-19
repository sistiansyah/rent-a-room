"use client";

import { Group, Image, Rect, Text } from "react-konva";
import useImage from "use-image";
import { WorkSpaceType } from "@/@types/product.type";

interface WorkspaceItemProps {
    item: WorkSpaceType;
    setItems: React.Dispatch<
        React.SetStateAction<WorkSpaceType[]>
    >;
    selectedWorkItemId: string | null;
    setSelectedWorkItemId: React.Dispatch<React.SetStateAction<string | null>>;
    onDeleteWorkspaceItem: (id: string) => void;
}

export default function WorkspaceItem({
    item,
    selectedWorkItemId,
    setItems,
    setSelectedWorkItemId,
    onDeleteWorkspaceItem
}: WorkspaceItemProps) {
    const [image] = useImage(item.thumbnail);
    const isSelected = selectedWorkItemId === item.id;

    if (!image) return;

    return (
        <Group
            x={item.x}
            y={item.y}
            draggable
            onClick={() => {
                setSelectedWorkItemId(item.id);
            }}
            onTap={() => {
                setSelectedWorkItemId(item.id);
            }}
            onDragEnd={(e) => {
                const { x, y } = e.target.position();

                setItems((prev) =>
                    prev.map((workspaceItem) =>
                        workspaceItem.id === item.id
                            ? {
                                ...workspaceItem,
                                x,
                                y,
                            }
                            : workspaceItem
                    )
                );
            }}
        >
            {
                isSelected && (
                    <Rect
                        x={-4}
                        y={-4}
                        width={item.width + 8}
                        height={item.height + 8}
                        stroke="#3B82F6"
                        strokeWidth={2}
                        cornerRadius={8}
                    />
                )
            }
            <Image
                image={image}
                width={item.width}
                height={item.height}
            />
            {
                isSelected && (
                    <>
                        <Rect
                            x={item.width - 12}
                            y={-12}
                            width={24}
                            height={24}
                            fill="#EF4444"
                            cornerRadius={999}
                            shadowBlur={4}
                        />
                        <Text
                            x={item.width - 5}
                            y={-8}
                            text="×"
                            fontSize={16}
                            fill="white"
                            fontStyle="bold"
                            onClick={() => onDeleteWorkspaceItem(item.id)}
                        />
                    </>
                )
            }
        </Group>
    )
}