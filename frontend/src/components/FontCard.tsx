interface FontCardProps {
    fontFamily: string;
    text: string;

}

const FontCard: React.FC<FontCardProps> = ({ fontFamily, text }) => {
    return (
        <div className="w-full py-8 border-b border-gray-700 text-white">
            
            <div className="flex items-baseline gap-4 text-sm text-gray-400 mb-4" style={{ fontFamily: 'sans-serif' }}>
                <h3 className="text-base font-semibold text-white">{fontFamily}</h3>

            </div>

            {/* Preview Text */}
            <p className="text-3xl text-white" style={{ fontFamily }}>
                {text || 'Like this'}
            </p>
        </div>
    );
};

export default FontCard; 