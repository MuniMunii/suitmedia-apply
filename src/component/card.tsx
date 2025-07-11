import { formatLatinDate } from "../util/latinDate";
interface CardProps{
    title:string|undefined;
    published_at:string|undefined;
    src:string|undefined;
}
export default function Card({title,published_at,src}:CardProps){
    const date=published_at
    return <div className="w-60 h-72 font-roboto bg-white rounded-md flex flex-col text-black shadow-[0_3px_10px_rgb(0,0,0,0.2)] cursor-pointer">
                        <img loading="lazy" src={src} alt={`gambar-${src}`} className="bg-black w-full h-40 rounded-t-md overflow-hidden object-cover"/>
                        <div className="flex-col flex pt-4 p-4">
                            <p className="text-gray-600 uppercase">{formatLatinDate(date)}</p>
                            <h2 className="line-clamp-3 text-ellipsis font-semibold">{title}</h2>
                        </div>
                    </div>
}