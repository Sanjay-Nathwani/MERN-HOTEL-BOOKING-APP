type Props = {
    selectedPrice?: number;
    onChange : (value?:number) => void;
}

const PriceFilters = ({selectedPrice,onChange}:Props) => {
    return (
      <div className="pb-5">
        <h4 className="text-base font-semibold mb-2">Max Price</h4>
        <select
          value={selectedPrice}
          onChange={(event) =>
            onChange(
              event.target.value ? parseInt(event.target.value) : undefined
            )
          }
          className="p-2 border rounded-md w-full"
        >
            <option value="">Select Max Price</option>
            {[50,100,200,300,400].map((price)=>(
                <option value={price}>{price}</option>
            ))}
        </select>
      </div>
    );
}

export default PriceFilters;