export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-8 text-center sm:text-left">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            TripCanvas
          </h1>
        </div>
        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          TripCanvas is an AI-native travel planning prototype that turns a user&apos;s natural-language trip request
          into a structured, editable travel plan. Instead of behaving like a raw chatbot, it combines conversational
          input, itinerary generation, recommendation cards, and clear confidence/fallback states to help users move
          from vague travel intent to a usable trip plan. It is designed as the frontend foundation for a future booking
          companion rather than a one-off AI wrapper.
        </p>
      </main>
    </div>
  );
}
