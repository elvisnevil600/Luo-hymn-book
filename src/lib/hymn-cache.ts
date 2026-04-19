export interface Hymn {
  number: number;
  title: string;
  lyrics: string;
}

let cachedHymns: Hymn[] | null = null;

export async function getHymns(): Promise<Hymn[]> {
  if (cachedHymns) return cachedHymns;

  try {
    const response = await fetch("/hymns.json");
    if (!response.ok) throw new Error("Failed to fetch hymns");
    const data = await response.json();
    cachedHymns = data;
    return data;
  } catch (error) {
    console.error("Error loading hymns:", error);
    return [];
  }
}
