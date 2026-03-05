import { useDroppable } from "@dnd-kit/core";


const DropBox = ({ children }) => {
    const { setNodeRef, isOver } = useDroppable({ id: "dropbox" });

    const style = {
        backgroundColor: isOver && "gray"
    }

    return (
        <section ref={setNodeRef} style={style} className="TileDropContainer">
            {children}
        </section>
    )
}

export default DropBox