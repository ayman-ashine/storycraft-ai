import { Container } from "@/components/ui/container";
import { Screen } from "@/components/ui/screen";
import { Scroll } from "@/components/ui/scroll";
import Image from "next/image";

export default function HowItWorks() {
  return (
    <Screen>
      <Scroll>
        <Container>
          <Image
            className="rounded-xl object-cover"
            src={"/icons/og-image.png"}
            alt="Story Craft preview"
            width={800}
            height={420}
          />
          <h1 className={"title"}>📚 How to Use StoryCraft AI</h1>
          <p className={"text"}>
            StoryCraft AI is a powerful and simple web application that helps
            you generate, edit, and manage AI-powered stories with full control
            over genre, tone, style, and audience. Whether you{`'`}re writing
            for kids or crafting a suspenseful thriller, this tool adapts to
            your creativity.
          </p>

          <h1 className={"title"}>🎬 Step 1: Create a Story</h1>
          <p className={"text"}>
            Begin by selecting a combination of storytelling preferences and
            entering your own idea or prompt.
          </p>
          <ul className={"list"}>
            <li>
              <strong>Genre:</strong> Choose from 25+ genres including
              adventure, sci-fi, fantasy, romance, thriller, horror, and more.
            </li>
            <li>
              <strong>Tone Style:</strong> Set the mood (e.g., humorous, dark,
              dramatic, lighthearted, romantic, suspenseful).
            </li>
            <li>
              <strong>Narrative Perspective:</strong> Pick from first-person,
              third-person, or even multiple or unreliable perspectives.
            </li>
            <li>
              <strong>Audience Age Group:</strong> Target your story to kids,
              teens, adults, or seniors.
            </li>
            <li>
              <strong>Story Length:</strong> Ranges from very short (150 words)
              to long (1500 words).
            </li>
            <li>
              <strong>Language:</strong> Generate stories in 20+ languages,
              including English, French, Arabic, Spanish, and more.
            </li>
            <li>
              <strong>Prompt:</strong> Add your own idea or concept to shape the
              story`s direction.
            </li>
          </ul>

          <div className={"note"}>
            💡 Tip: You can leave the prompt empty to let the AI fully imagine a
            story based on your selected options.
          </div>

          <h1 className={"title"}>✍️ Step 2: Edit the Story</h1>
          <p className={"text"}>
            Once the story is generated, you{`'`}ll be redirected to the editing
            section where the full story appears in a textarea.
          </p>
          <ul className={"list"}>
            <li>
              Modify the story freely — rewrite, trim, expand, or correct any
              part.
            </li>
            <li>Story content updates in real-time as you type.</li>
          </ul>

          <h1 className={"title"}>📦 Step 3: Save to Archive</h1>
          <p className={"text"}>
            Click “Save to Archive” to store your story locally in your browser.
          </p>
          <ul className={"list"}>
            <li>
              <strong>Archive:</strong> Access all your saved stories anytime.
            </li>
            <li>
              <strong>Edit Later:</strong> Reopen and re-edit any story.
            </li>
            <li>
              <strong>Copy:</strong> Instantly copy a story to your clipboard.
            </li>
            <li>
              <strong>Delete:</strong> Remove stories you no longer need.
            </li>
          </ul>

          <div className={"note"}>
            🔒 No account is required. Your stories are stored locally on your
            device and never uploaded online.
          </div>

          <h1 className={"title"}>⚙️ Features Summary</h1>
          <ul className={"list"}>
            <li>25+ genres and flexible tone/mood options</li>
            <li>Editable narrative perspective and language support</li>
            <li>Supports all age groups and multiple story lengths</li>
            <li>Instant AI story generation with prompt support</li>
            <li>Fully editable content in real time</li>
            <li>Local archive with save, edit, copy, and delete</li>
            <li>Fast and responsive interface for quick storytelling</li>
          </ul>

          <div className={"note"}>
            🚀 StoryCraft AI is built for speed, simplicity, and creativity —
            perfect for writers, educators, parents, or anyone looking to bring
            ideas to life in seconds.
          </div>
        </Container>
      </Scroll>
    </Screen>
  );
}
