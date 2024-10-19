import Image from 'next/image'

export default function FeaturedContent({ content }: any) {
  if (!content) return null

  return (
    <div className="relative h-[70vh] mb-8">
      <Image src={content.image} alt={content.title} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent">
        <div className="absolute bottom-16 left-16 max-w-lg">
          <div className="mb-2 text-sm font-semibold">{content.type}</div>
          <h1 className="mb-4 text-6xl font-bold">{content.title}</h1>
          <div className="mb-4 text-sm">
            <span>{content.year}</span>
            <span className="mx-2">|</span>
            <span>{content.rating}</span>
            <span className="mx-2">|</span>
            <span>{content.duration}</span>
          </div>
          <p className="mb-6">{content.description}</p>
          <div className="flex space-x-4">
            <button className="px-8 py-2 bg-white text-black font-semibold rounded">
              ▶ Play
            </button>
            <button className="px-8 py-2 bg-gray-500 text-white font-semibold rounded">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}