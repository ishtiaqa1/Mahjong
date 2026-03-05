import { useDroppable } from "@dnd-kit/core";


const SwapBox = ({ children }) => {
    const { setNodeRef, isOver } = useDroppable({ id: "swap-box" });

    const style = {
        backgroundColor: isOver && "gray"
    }

    return (
        <section ref={setNodeRef} style={style} className="TileDropContainer">
            {children}
        </section>
    )
}

export default SwapBox