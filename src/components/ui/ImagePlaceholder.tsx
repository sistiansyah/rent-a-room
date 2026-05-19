const ImagePlaceholder = ({
    width, height, fill,
}: {
    width: number, height: number, fill: boolean;
}) => {
    return (
        <div className="image-placeholder" style={{ width: fill ? '100%' : width, height }}>

        </div>
    )
}

export default ImagePlaceholder;