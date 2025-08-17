import { useEffect, useState, type JSX } from "react";

interface IItem {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

interface IItemsProps {
  items: IItem[];
  theme: "dark" | "white";
  value: number;
}

const MOBILE_WIDTH: number = 767; 

export default function Items(props: IItemsProps): JSX.Element
{
  const [mobile, setMobile] = useState<boolean>( window.innerWidth <= MOBILE_WIDTH );

  function formatNumber(str: string) {
    const [integerPart, decimalPart] = str.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
  }

  function formatDescription(description: string, value: number, price: number) {
    const quantity = String(Math.floor(value / price));
    const formattedValue = value.toFixed(2);

    const formattedText = description
      .replace(
        '[quantidade]', 
        `<span class="quantity ${props.theme === "dark" ? 'text-yellow-300' : 'text-blue-600'} font-semibold">${formatNumber(quantity)}</span>`
      )
      .replace(
        '[valor]', 
        `<span class="value ${props.theme === "dark" ? 'text-green-400' : 'text-green-600'} font-semibold">${formatNumber(formattedValue)}</span>`
      );

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  }

  useEffect((): any => {
    function handleResize(): void {
      if (window.innerWidth > MOBILE_WIDTH) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {props.items.map((item) => 
      <li key={item.id} className={`max-w-[800px] min-w-[320px] grid grid-cols-1 md:grid-cols-3 m-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-1000 overflow-hidden border mb-3
        ${props.theme === "dark" ? 'bg-neutral-950' : 'bg-white'}
        ${props.theme === "dark" ? 'border-neutral-800' : 'border-neutral-400'}`}>
          {mobile ? (
            <>
              <img 
                src={item.image}
                className="w-full h-48 object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
                alt={item.name}
              />
              <article className="p-4 md:col-span-2 flex flex-col justify-center">
                <h2 className={`text-3xl font-bold mb-2 transition-all duration-1000
                  ${props.theme === "dark" ? 'text-white/90' : 'text-black'}`}>
                  {item.name}
                </h2>
                <p className={`text-sm leading-relaxed transition-all duration-1000
                  ${props.theme === "dark" ? 'text-white/80' : 'text-black'}`}>
                  {formatDescription(item.description, props.value, item.price)}
                </p>
              </article>
            </>
          ) : item.id % 2 === 0 ? (
            <>
              <article className="p-4 md:col-span-2 flex flex-col justify-center text-right">
                <h2 className={`text-3xl font-bold mb-2 transition-all duration-1000
                  ${props.theme === "dark" ? 'text-white/90' : 'text-black'}`}>
                  {item.name}
                </h2>
                <p className={`text-sm leading-relaxed transition-all duration-1000
                  ${props.theme === "dark" ? 'text-white/80' : 'text-black'}`}>
                  {formatDescription(item.description, props.value, item.price)}
                </p>
              </article>
              <img 
                src={item.image}
                className="w-full h-48 object-cover rounded-t-2xl md:rounded-t-none md:rounded-r-2xl"
                alt={item.name}
              />
            </>
          ) : (
            <>
              <img 
                src={item.image}
                className="w-full h-48 object-cover rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
                alt={item.name}
              />
              <article className="p-4 md:col-span-2 flex flex-col justify-center">
                <h2 className={`text-3xl font-bold mb-2 transition-all duration-1000
                  ${props.theme === "dark" ? 'text-white/90' : 'text-black'}`}>
                  {item.name}
                </h2>
                <p className={`text-sm leading-relaxed transition-all duration-1000
                  ${props.theme === "dark" ? 'text-white/80' : 'text-black'}`}>
                  {formatDescription(item.description, props.value, item.price)}
                </p>
              </article>
            </>
          )}
        </li>
      )}
    </>
  );
}