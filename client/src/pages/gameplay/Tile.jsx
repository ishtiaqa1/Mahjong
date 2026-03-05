import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

const tileImages = import.meta.glob('/src/assets/MahjongTiles-Design/*.png', { eager: true });

const getTileDesign = (tileName) => {
  const nameMap = {
    "Joker": "Joker",
    "Flower": "Flower",
    "Green Dragon": "Green-Dragon",
    "Red Dragon": "Red-Dragon",
    "White Dragon": "White-Dragon",
    "North": "North",
    "South": "South",
    "East": "East",
    "West": "West"
};

  const numberMatch = tileName.match(/(\d+)\s(Dot|Bam|Crack)/);
  if (numberMatch) {
    const [_, num, type] = numberMatch;
    const expectedName = `${num}-${type}`.toLowerCase();
    
    return Object.keys(tileImages).find(path => 
      path.toLowerCase().includes(expectedName)
    );
  }

  const baseName = nameMap[tileName] || tileName.replace(/\s+/g, '-');
  return Object.keys(tileImages).find(path => {
    const fileName = path.split('/').pop().split('.')[0]; 
    return fileName.toLowerCase() === baseName.toLowerCase();
  });
};

const Tile = ({ tile }) => {
    const { attributes, listeners, isDragging, setNodeRef, transform, transition } = useSortable({ id: tile.id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        zIndex: isDragging ? 5 : 0,
        opacity: isDragging || tile.locked ? 0.7 : 1
    };

    const imagePath = getTileDesign(tile.name);

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`Tile ${tile.locked ? "locked" : ""}`}>
            {imagePath && (
                <img 
                    src={tileImages[imagePath].default}
                    alt={tile.name}
                    className="tile-image"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.style.display = 'block';
                    }}
                />
            )}
            
            <div className="tile-fallback" style={{ display: imagePath ? 'none' : 'block' }}>
                {tile.name}
                {(tile.groupname !== "" && tile.locked && tile.name === "Joker") && (
                    <div className='TileSubtitle'>
                        <div style={{ margin: 4 }} />
                        {tile.groupname}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tile;