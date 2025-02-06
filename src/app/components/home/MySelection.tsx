import {
  ClipboardDocumentListIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { FC, useMemo, useState } from "react"
import { Button } from "../daisy"
import { normalizeTime } from "./common"

export interface SelectedArtist {
  id: string
  name: string
  time: string
  stage: string
}

interface MySelectionProps {
  day1Artists: SelectedArtist[]
  day2Artists: SelectedArtist[]
  selectedArtists: Map<string, SelectedArtist>
  onDelete: (id: string) => void
}

const SelectedArtistCard: FC<{
  artist: SelectedArtist
  hideStage?: boolean
  onDelete?: (id: string) => void
}> = ({ artist, hideStage, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-base-100 rounded-lg">
      <div>
        <div className="font-medium">{artist.name}</div>
        <div className="text-sm opacity-70 flex gap-2">
          <span>{artist.time}hs</span>
          {!hideStage && <span>·</span>}
          {!hideStage && <span>{artist.stage}</span>}
        </div>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(artist.id)}
          className="btn btn-ghost btn-sm"
          title="Eliminar artista"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export const MySelection: FC<MySelectionProps> = ({
  day1Artists,
  day2Artists,
  selectedArtists,
  onDelete,
}) => {
  const [viewMode, setViewMode] = useState<"stage" | "time">("stage")

  const sortedArtists = useMemo(() => {
    // Sort day 1 artists
    const day1ByTime = day1Artists.sort(
      (a, b) => normalizeTime(a.time) - normalizeTime(b.time),
    )
    const day1ByStage = day1Artists.reduce(
      (acc, artist) => {
        if (!acc[artist.stage]) {
          acc[artist.stage] = []
        }
        acc[artist.stage].push(artist)
        return acc
      },
      {} as Record<string, SelectedArtist[]>,
    )

    // Sort day 2 artists
    const day2ByTime = day2Artists.sort(
      (a, b) => normalizeTime(a.time) - normalizeTime(b.time),
    )
    const day2ByStage = day2Artists.reduce(
      (acc, artist) => {
        if (!acc[artist.stage]) {
          acc[artist.stage] = []
        }
        acc[artist.stage].push(artist)
        return acc
      },
      {} as Record<string, SelectedArtist[]>,
    )

    // Sort artists within each stage by time
    Object.values(day1ByStage).forEach(stageArtists => {
      stageArtists.sort((a, b) => normalizeTime(a.time) - normalizeTime(b.time))
    })
    Object.values(day2ByStage).forEach(stageArtists => {
      stageArtists.sort((a, b) => normalizeTime(a.time) - normalizeTime(b.time))
    })

    // Sort stages alphabetically
    const day1SortedByStage = Object.entries(day1ByStage)
      .sort(([stageA], [stageB]) => stageA.localeCompare(stageB))
      .reduce(
        (acc, [stage, artists]) => {
          acc[stage] = artists
          return acc
        },
        {} as Record<string, SelectedArtist[]>,
      )

    const day2SortedByStage = Object.entries(day2ByStage)
      .sort(([stageA], [stageB]) => stageA.localeCompare(stageB))
      .reduce(
        (acc, [stage, artists]) => {
          acc[stage] = artists
          return acc
        },
        {} as Record<string, SelectedArtist[]>,
      )

    return {
      day1: {
        byTime: day1ByTime,
        byStage: day1SortedByStage,
      },
      day2: {
        byTime: day2ByTime,
        byStage: day2SortedByStage,
      },
    }
  }, [day1Artists, day2Artists])

  const generateShareMessage = () => {
    const formatDayScheduleByStage = (artists: SelectedArtist[]) => {
      if (artists.length === 0) return ""

      const byStage = artists.reduce(
        (acc, artist) => {
          if (!acc[artist.stage]) {
            acc[artist.stage] = []
          }
          acc[artist.stage].push(artist)
          return acc
        },
        {} as Record<string, SelectedArtist[]>,
      )

      // Sort artists within each stage by time
      Object.values(byStage).forEach(stageArtists => {
        stageArtists.sort(
          (a, b) => normalizeTime(a.time) - normalizeTime(b.time),
        )
      })

      let message = ""
      Object.entries(byStage)
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([stage, artists]) => {
          message += `\n🎪 ${stage}:\n`
          artists.forEach(artist => {
            message += `${artist.time}hs - ${artist.name}\n`
          })
        })

      return message
    }

    const formatDayScheduleByTime = (artists: SelectedArtist[]) => {
      if (artists.length === 0) return ""

      const sortedArtists = [...artists].sort(
        (a, b) => normalizeTime(a.time) - normalizeTime(b.time),
      )
      let message = ""
      sortedArtists.forEach(artist => {
        message += `${artist.time}hs - ${artist.name} (${artist.stage})\n`
      })

      return message
    }

    let message = "🎵 Mi Grilla CR 2025 🎵\n"

    if (day1Artists.length > 0) {
      message += "\n📅 DÍA 1:\n"
      message +=
        viewMode === "stage"
          ? formatDayScheduleByStage(day1Artists)
          : formatDayScheduleByTime(day1Artists)
    }

    if (day2Artists.length > 0) {
      message += "\n📅 DÍA 2:\n"
      message +=
        viewMode === "stage"
          ? formatDayScheduleByStage(day2Artists)
          : formatDayScheduleByTime(day2Artists)
    }

    return message
  }

  const handleShare = async () => {
    const message = generateShareMessage()

    if (navigator.share) {
      try {
        await navigator.share({
          text: message,
        })
      } catch (error) {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)}`,
          "_blank",
        )
      }
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank",
      )
    }
  }

  const handleCopyToClipboard = async () => {
    const message = generateShareMessage()
    try {
      await navigator.clipboard.writeText(message)
      // You might want to add a toast notification here
      alert("¡Copiado al portapapeles!")
    } catch (error) {
      console.error("Error copying to clipboard:", error)
    }
  }

  return (
    <div className="bg-base-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mi Selección</h2>
        <div className="flex items-center gap-4">
          <div className="join">
            <Button
              className={`join-item ${viewMode === "stage" && "btn-active"}`}
              onClick={() => setViewMode("stage")}
            >
              Por Escenario
            </Button>
            <Button
              className={`join-item ${viewMode === "time" && "btn-active"}`}
              onClick={() => setViewMode("time")}
            >
              Por Horario
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {day1Artists.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Día 1</h3>
            {viewMode === "stage" ? (
              <div className="space-y-6">
                {Object.entries(sortedArtists.day1.byStage).map(
                  ([stage, artists]) => (
                    <div key={stage}>
                      <h3 className="font-bold mb-2">{stage}</h3>
                      <div className="space-y-2">
                        {artists.map(artist => (
                          <SelectedArtistCard
                            key={artist.id}
                            artist={artist}
                            hideStage
                            onDelete={onDelete}
                          />
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedArtists.day1.byTime.map(artist => (
                  <SelectedArtistCard
                    key={artist.id}
                    artist={artist}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {day2Artists.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Día 2</h3>
            {viewMode === "stage" ? (
              <div className="space-y-6">
                {Object.entries(sortedArtists.day2.byStage).map(
                  ([stage, artists]) => (
                    <div key={stage}>
                      <h3 className="font-bold mb-2">{stage}</h3>
                      <div className="space-y-2">
                        {artists.map(artist => (
                          <SelectedArtistCard
                            key={artist.id}
                            artist={artist}
                            hideStage
                            onDelete={onDelete}
                          />
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedArtists.day2.byTime.map(artist => (
                  <SelectedArtistCard
                    key={artist.id}
                    artist={artist}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {selectedArtists.size === 0 && (
          <p className="opacity-70">No hay artistas seleccionados</p>
        )}
      </div>

      {selectedArtists.size > 0 && (
        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="lg"
            color="secondary"
            onClick={handleShare}
            className="gap-2"
          >
            <ShareIcon className="w-5" />
            Compartir
          </Button>
          <Button
            size="lg"
            color="secondary"
            onClick={handleCopyToClipboard}
            className="gap-2"
          >
            <ClipboardDocumentListIcon className="w-5" />
            Copiar
          </Button>
        </div>
      )}
    </div>
  )
}
