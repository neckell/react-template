import { AnimatePresence, motion } from "framer-motion"
import { FC, useMemo, useState } from "react"
import {
  Band,
  getStages,
  loadDaySchedule,
} from "../../assets/loaders/eventsLoader"
import Button from "../../components/daisy/Button"

interface SelectedArtist {
  name: string
  time: string
  stage: string
  day: 1 | 2
}

interface SortedArtists {
  day1Artists: SelectedArtist[]
  day2Artists: SelectedArtist[]
}

const parseTime = (time: string): number => 
  parseFloat(time.replace(":", "."))

const sortByTime = (a: SelectedArtist, b: SelectedArtist): number => 
  parseTime(a.time) - parseTime(b.time)

const filterByDay = (artists: SelectedArtist[], day: 1 | 2): SelectedArtist[] =>
  artists.filter(artist => artist.day === day).sort(sortByTime)

const Main: FC = () => {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const [selectedArtists, setSelectedArtists] = useState<
    Map<string, SelectedArtist>
  >(new Map())
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const schedule = useMemo(() => loadDaySchedule(selectedDay), [selectedDay])
  const stages = useMemo(() => getStages(schedule), [schedule])

  const handleArtistToggle = (band: Band, stage: string) => {
    setSelectedArtists(prev => {
      const newMap = new Map(prev)
      if (newMap.has(band.band)) {
        newMap.delete(band.band)
      } else {
        newMap.set(band.band, {
          name: band.band,
          time: band.time,
          stage: stage,
          day: selectedDay,
        })
      }
      return newMap
    })
  }

  const sortedArtistsByDay = useMemo((): SortedArtists => {
    const artists = Array.from(selectedArtists.values())
    return {
      day1Artists: filterByDay(artists, 1),
      day2Artists: filterByDay(artists, 2),
    }
  }, [selectedArtists])

  const SelectedArtistsList = () => (
    <div className="space-y-4">
      {/* Day 1 */}
      {sortedArtistsByDay.day1Artists.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px bg-base-content/20 flex-1" />
            <h3 className="font-bold opacity-70">Día 1</h3>
            <div className="h-px bg-base-content/20 flex-1" />
          </div>
          <div className="space-y-2">
            {sortedArtistsByDay.day1Artists.map(artist => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="p-3 bg-base-200 rounded"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{artist.name}</span>
                  <button
                    onClick={() =>
                      handleArtistToggle(
                        { band: artist.name, time: artist.time },
                        artist.stage,
                      )
                    }
                    className="btn btn-ghost btn-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm opacity-70 flex gap-2">
                  <span>{artist.time}hs</span>
                  <span>•</span>
                  <span>{artist.stage}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Day 2 */}
      {sortedArtistsByDay.day2Artists.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px bg-base-content/20 flex-1" />
            <h3 className="font-bold opacity-70">Día 2</h3>
            <div className="h-px bg-base-content/20 flex-1" />
          </div>
          <div className="space-y-2">
            {sortedArtistsByDay.day2Artists.map(artist => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="p-3 bg-base-200 rounded"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{artist.name}</span>
                  <button
                    onClick={() =>
                      handleArtistToggle(
                        { band: artist.name, time: artist.time },
                        artist.stage,
                      )
                    }
                    className="btn btn-ghost btn-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm opacity-70 flex gap-2">
                  <span>{artist.time}hs</span>
                  <span>•</span>
                  <span>{artist.stage}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedArtists.size === 0 && (
        <p className="text-sm opacity-70">No hay artistas seleccionados</p>
      )}
    </div>
  )

  return (
    <main className="flex-1 pt-20 px-4 pb-24 lg:pb-4 mt-6">
      <div className="container mx-auto">
        <div className="flex justify-center gap-4 mb-8">
          <Button
            size="lg"
            color={selectedDay === 1 ? "primary" : "ghost"}
            active={selectedDay === 1}
            onClick={() => setSelectedDay(1)}
          >
            Día 1
          </Button>
          <Button
            size="lg"
            color={selectedDay === 2 ? "primary" : "ghost"}
            active={selectedDay === 2}
            onClick={() => setSelectedDay(2)}
          >
            Día 2
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-24 h-fit">
            <div className="p-4 bg-[rgba(1,134,71,0.5)] rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                Mi Grilla{" "}
                {selectedArtists.size > 0 && `(${selectedArtists.size})`}
              </h2>
              <AnimatePresence>
                <SelectedArtistsList />
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stages.map(stage => (
                <div key={stage} className="p-4 bg-base-200 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">{stage}</h2>
                  <div className="space-y-4">
                    {schedule[stage].map((band, index) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-base-100 rounded-lg flex items-center gap-3"
                        whileTap={{ scale: 0.95 }}
                        layout
                      >
                        <label className="cursor-pointer label">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedArtists.has(band.band)}
                            onChange={() => handleArtistToggle(band, stage)}
                          />
                        </label>
                        <div>
                          <h3 className="font-bold">{band.band}</h3>
                          <p className="text-sm opacity-70">{band.time}hs</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setIsBottomSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-[rgba(1,134,71,0.95)] rounded-t-xl p-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Mi Grilla{" "}
                  {selectedArtists.size > 0 && `(${selectedArtists.size})`}
                </h2>
                <button
                  onClick={() => setIsBottomSheetOpen(false)}
                  className="btn btn-circle btn-ghost btn-sm"
                >
                  ✕
                </button>
              </div>
              <AnimatePresence>
                <SelectedArtistsList />
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile FAB */}
      <motion.button
        className="lg:hidden fixed bottom-6 right-6 btn btn-circle btn-primary btn-lg shadow-lg"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsBottomSheetOpen(true)}
      >
        {selectedArtists.size}
      </motion.button>
    </main>
  )
}

export default Main
