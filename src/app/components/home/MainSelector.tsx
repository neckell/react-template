import { AnimatePresence, motion } from "framer-motion"
import { FC, useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "react-responsive"

import {
  ArrowLeftCircleIcon,
  ArrowUpCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import {
  Band,
  DaySchedule as DayScheduleType,
  getStages,
  loadDaySchedule,
} from "../../assets/loaders/eventsLoader"
import { breakpoints } from "../../constants/breakpoints"
import { Button } from "../daisy"
import { MySelection, SelectedArtist } from "./MySelection"
import { normalizeTime } from "./common"

interface SortedArtists {
  day1Artists: SelectedArtist[]
  day2Artists: SelectedArtist[]
}

const MainSelector: FC = () => {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1)
  const [selectedArtists, setSelectedArtists] = useState<
    Map<string, SelectedArtist>
  >(new Map())
  const [currentStep, setCurrentStep] = useState<"selection" | "mySelection">(
    "selection",
  )
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const day1Schedule = loadDaySchedule(1)
  const day2Schedule = loadDaySchedule(2)

  const isMobile = useMediaQuery({ query: breakpoints.lg })

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleArtistToggle = (band: Band, stage: string) => {
    setSelectedArtists(prev => {
      const newMap = new Map(prev)
      if (newMap.has(band.band)) {
        newMap.delete(band.band)
      } else {
        newMap.set(band.band, {
          id: band.band,
          name: band.band,
          time: band.time,
          stage: stage,
        })
      }
      return newMap
    })
  }

  const handleArtistDelete = (id: string) => {
    const newSelectedArtists = new Map(selectedArtists)
    newSelectedArtists.delete(id)
    setSelectedArtists(newSelectedArtists)
  }

  const handleClearAll = () => {
    setSelectedArtists(new Map())
  }

  const getArtistsByDay = (
    selectedArtists: Map<string, SelectedArtist>,
  ): SortedArtists => {
    const day1Artists: SelectedArtist[] = []
    const day2Artists: SelectedArtist[] = []

    for (const artist of selectedArtists.values()) {
      // Check if artist exists in day1Schedule
      let foundInDay1 = false
      for (const stage of Object.keys(day1Schedule)) {
        if (day1Schedule[stage].some(band => band.band === artist.name)) {
          foundInDay1 = true
          day1Artists.push(artist)
          break
        }
      }

      // If not found in day1, check day2
      if (!foundInDay1) {
        for (const stage of Object.keys(day2Schedule)) {
          if (day2Schedule[stage].some(band => band.band === artist.name)) {
            day2Artists.push(artist)
            break
          }
        }
      }
    }

    return { day1Artists, day2Artists }
  }

  const sortedArtistsByDay = useMemo(() => {
    const artists = getArtistsByDay(selectedArtists)
    return {
      day1Artists: artists.day1Artists.sort((a, b) => {
        return normalizeTime(a.time) - normalizeTime(b.time)
      }),
      day2Artists: artists.day2Artists.sort((a, b) => {
        return normalizeTime(a.time) - normalizeTime(b.time)
      }),
    }
  }, [selectedArtists])

  const DaySection: FC<{
    dayNumber: 1 | 2
    schedule: DayScheduleType
    stages: string[]
  }> = ({ dayNumber, schedule, stages }) => {
    if (stages.length === 0) return null

    return (
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">Día {dayNumber}</h2>
          <div className="h-px bg-base-content/20 flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {stages.map(stage => (
            <div key={stage} className="rounded-lg bg-base-300 p-4">
              <h3 className="font-bold mb-3">{stage}</h3>
              <div className="grid gap-2">
                {schedule[stage].map((band, index) => (
                  <motion.div
                    key={`${band.band}-${index}`}
                    className="flex items-center justify-between gap-4 p-3 bg-base-100 rounded cursor-pointer hover:bg-base-200 transition-colors"
                    onClick={() => handleArtistToggle(band, stage)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-1">
                      <div className="font-bold">{band.band}</div>
                      <div className="text-sm opacity-70">{band.time}hs</div>
                    </div>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary pointer-events-none"
                      checked={selectedArtists.has(band.band)}
                      readOnly
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <main className="flex-1 pt-20 px-4 pb-8 lg:pb-24 lg:pb-4 mt-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            {currentStep === "selection" && (
              <div className="hidden lg:block lg:w-1/4 lg:sticky lg:top-24 h-fit">
                <div className="p-4 bg-secondary rounded-lg">
                  <h2 className="text-xl font-bold mb-4">
                    Mi Grilla{" "}
                    {selectedDay === 1 &&
                    sortedArtistsByDay.day1Artists.length > 0
                      ? `(${sortedArtistsByDay.day1Artists.length})`
                      : selectedDay === 2 &&
                          sortedArtistsByDay.day2Artists.length > 0
                        ? `(${sortedArtistsByDay.day2Artists.length})`
                        : ""}
                  </h2>
                  <div className="space-y-2">
                    {(selectedDay === 1
                      ? sortedArtistsByDay.day1Artists
                      : sortedArtistsByDay.day2Artists
                    )
                      .sort(
                        (a, b) => normalizeTime(a.time) - normalizeTime(b.time),
                      )
                      .map(artist => (
                        <div
                          key={artist.id}
                          className="flex items-center justify-between p-2 bg-base-100 rounded"
                        >
                          <div>
                            <div className="font-medium">{artist.name}</div>
                            <div className="text-sm opacity-70">
                              {artist.time}hs · {artist.stage}
                            </div>
                          </div>
                          <button
                            onClick={() => handleArtistDelete(artist.id)}
                            className="btn btn-ghost btn-sm"
                            title="Eliminar artista"
                          >
                            <TrashIcon className="w-4" />
                          </button>
                        </div>
                      ))}
                    {(selectedDay === 1
                      ? sortedArtistsByDay.day1Artists.length === 0
                      : sortedArtistsByDay.day2Artists.length === 0) && (
                      <p className="text-sm opacity-70">
                        No hay artistas seleccionados para este día
                      </p>
                    )}
                  </div>
                  {selectedArtists.size > 0 && (
                    <Button
                      color="error"
                      size="sm"
                      className="mt-4 w-full"
                      onClick={handleClearAll}
                    >
                      <TrashIcon className="w-4 h-4 me-2" />
                      Borrar selección
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {currentStep === "selection" ? (
                  <motion.div
                    key="selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className="join">
                          <Button
                            className={`join-item ${selectedDay === 1 && "btn-active"}`}
                            onClick={() => setSelectedDay(1)}
                          >
                            Día 1
                          </Button>
                          <Button
                            className={`join-item ${selectedDay === 2 && "btn-active"}`}
                            onClick={() => setSelectedDay(2)}
                          >
                            Día 2
                          </Button>
                        </div>
                        <Button
                          color="primary"
                          onClick={() => setCurrentStep("mySelection")}
                        >
                          Ver Mi Selección →
                        </Button>
                      </div>
                      <DaySection
                        dayNumber={selectedDay}
                        schedule={
                          selectedDay === 1 ? day1Schedule : day2Schedule
                        }
                        stages={getStages(
                          selectedDay === 1 ? day1Schedule : day2Schedule,
                        )}
                      />
                      {isMobile && (
                        <div className="flex justify-center mt-5">
                          <Button
                            color="primary"
                            onClick={() => setCurrentStep("mySelection")}
                          >
                            Ver Mi Selección →
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mySelection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Button
                        color="ghost"
                        onClick={() => setCurrentStep("selection")}
                      >
                        <ArrowLeftCircleIcon className="w-5 h-5 mr-1" />
                        Volver
                      </Button>
                    </div>
                    <MySelection
                      day1Artists={sortedArtistsByDay.day1Artists}
                      day2Artists={sortedArtistsByDay.day2Artists}
                      selectedArtists={selectedArtists}
                      onDelete={handleArtistDelete}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile FAB */}

      <motion.button
        className={`lg:hidden fixed bottom-4 right-6 btn btn-circle btn-primary btn-lg shadow-lg z-[100]
            ${(isBottomSheetOpen || currentStep === "mySelection") && "hidden"}`}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsBottomSheetOpen(true)}
      >
        {selectedArtists.size}
      </motion.button>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed ${isMobile ? "left-6" : "right-6"} bottom-4 z-[100] p-2 rounded-full 
            bg-neutral text-primary-content shadow-lg hover:bg-primary-focus transition-colors duration-200`}
            aria-label="Scroll to top"
          >
            <ArrowUpCircleIcon className="w-8 text-info" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isBottomSheetOpen && currentStep !== "mySelection" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsBottomSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-100 rounded-t-2xl p-4 z-50 max-h-[60vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-base-content/20 mx-auto rounded-full mb-4" />
              <div className="space-y-4">
                <h2 className="text-xl font-bold">
                  Mi Grilla - Dia {selectedDay}{" "}
                  {selectedDay === 1 &&
                  sortedArtistsByDay.day1Artists.length > 0
                    ? `(${sortedArtistsByDay.day1Artists.length})`
                    : selectedDay === 2 &&
                        sortedArtistsByDay.day2Artists.length > 0
                      ? `(${sortedArtistsByDay.day2Artists.length})`
                      : ""}
                </h2>
                <div className="space-y-2">
                  {(selectedDay === 1
                    ? sortedArtistsByDay.day1Artists
                    : sortedArtistsByDay.day2Artists
                  )
                    .sort(
                      (a, b) => normalizeTime(a.time) - normalizeTime(b.time),
                    )
                    .map(artist => (
                      <div
                        key={artist.id}
                        className="flex items-center justify-between p-2 bg-base-200 rounded"
                      >
                        <div>
                          <div className="font-medium">{artist.name}</div>
                          <div className="text-sm opacity-70">
                            {artist.time}hs · {artist.stage}
                          </div>
                        </div>
                        <button
                          onClick={() => handleArtistDelete(artist.id)}
                          className="btn btn-ghost btn-sm"
                          title="Eliminar artista"
                        >
                          <TrashIcon className="w-4" />
                        </button>
                      </div>
                    ))}
                  {(selectedDay === 1
                    ? sortedArtistsByDay.day1Artists.length === 0
                    : sortedArtistsByDay.day2Artists.length === 0) && (
                    <p className="text-sm opacity-70">
                      No hay artistas seleccionados para este día
                    </p>
                  )}
                </div>
                {selectedArtists.size > 0 && (
                  <div className="flex justify-center">
                    <Button
                      color="error"
                      size="sm"
                      className="max-w-xs"
                      onClick={handleClearAll}
                    >
                      Limpiar Todo
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default MainSelector
