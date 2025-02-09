import React, { useEffect, useCallback, useState, useRef } from "react";
import customAxios from "./http";

export const MONTHS = [
    "Baisakh",
    "Jestha",
    "Ashadh",
    "Shrawan",
    "Bhadra",
    "Ashwin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
];

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const fetchTodayNepaliDate = async () => {
    try {
        const response = await customAxios.get(
            `Daylist/GetItem/${new Date().getFullYear()}-${
                new Date().getMonth() + 1
            }-${new Date().getDate()}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching today's Nepali date:", error);
        throw error;
    }
};

export const fetchMonthData = async (year, month) => {
    const response = await customAxios.get(`DayList/GetList/${year}/${month}`);
    return response.data;
};

export const formatDate = (date) => {
    const formattedMonth = date.month < 10 ? `0${date.month}` : `${date.month}`;
    const formattedDay = date.day < 10 ? `0${date.day}` : `${date.day}`;
    return `${date.year}-${formattedMonth}-${formattedDay}`;
};

export const getDayClass = (isToday, isSelected, isDisabled = false) => {
    const baseClass =
        "h-8 w-8 rounded-lg flex items-center justify-center transition-colors duration-200";

    if (isDisabled) {
        return `${baseClass} bg-gray-100 text-gray-400 cursor-not-allowed`;
    }

    if (isSelected) {
        return `${baseClass} bg-blue-500 text-white hover:bg-blue-600 cursor-pointer`;
    }

    if (isToday) {
        return `${baseClass} border-2 border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer`;
    }

    return `${baseClass} hover:bg-blue-100 cursor-pointer`;
};

const Calendar = ({ restrict = false, value, setValue, editable = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [todayData, setTodayData] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(
        Number(value?.month !== 0 ? value?.month : 1)
    );
    const [currentYear, setCurrentYear] = useState(
        Number(value?.year !== 0 ? value?.year : 2081)
    );
    const [selectedDate, setSelectedDate] = useState({
        year: Number(value?.year !== 0 ? value?.year : currentYear),
        month: Number(value?.month !== 0 ? value?.month : currentMonth),
        day: Number(value?.day !== 0 ? value?.day : 1),
    });
    const [monthData, setMonthData] = useState(null);
    const [initialFetchComplete, setInitialFetchComplete] = useState(false);

    const [editingYear, setEditingYear] = useState(false);
    const [editingMonth, setEditingMonth] = useState(false);
    const [yearInput, setYearInput] = useState("");
    const [monthInput, setMonthInput] = useState("");

    const calendarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchInitialData = useCallback(async () => {
        try {
            console.log("Fetching initial data...");
            setIsLoading(true);
            const today = await fetchTodayNepaliDate();
            setTodayData(today);

            if (value?.year && value?.month && value?.day) {
                setCurrentYear(parseInt(value.year));
                setCurrentMonth(parseInt(value.month));
                setSelectedDate({
                    year: parseInt(value.year),
                    month: parseInt(value.month),
                    day: parseInt(value.day),
                });
            } else {
                setCurrentYear(today.Year);
                setCurrentMonth(today.Month);
            }
            const month = await fetchMonthData(
                value?.year ? parseInt(value.year) : today.Year,
                value?.month ? parseInt(value.month) : today.Month
            );
            setMonthData(month);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setInitialFetchComplete(true);
        }
    }, []);

    useEffect(() => {
        fetchInitialData();
    }, []); // Dependency array ensures this runs only once

    useEffect(() => {
        if (!initialFetchComplete) return;
        const fetchNewMonthData = async () => {
            try {
                setIsLoading(true);
                const month = await fetchMonthData(currentYear, currentMonth);
                setMonthData(month);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNewMonthData();
    }, [currentYear, currentMonth]);

    const handleDateSelect = (day) => {
        const newDate = {
            year: currentYear,
            month: currentMonth,
            day,
        };
        setSelectedDate(newDate);
        setValue?.({
            year: currentYear.toString(),
            month:
                currentMonth < 10
                    ? `0${currentMonth}`
                    : currentMonth.toString(),
            day: day < 10 ? `0${day}` : day.toString(),
        });
        setIsOpen(false);
    };

    const handleMonthChange = (direction = "next") => {
        if (isLoading) return;

        if (direction === "next") {
            if (
                restrict &&
                todayData &&
                currentYear === todayData.Year &&
                currentMonth === todayData.Month
            ) {
                return;
            }
            if (currentMonth === 12) {
                setCurrentYear((prev) => prev + 1);
                setCurrentMonth(1);
            } else {
                setCurrentMonth((prev) => prev + 1);
            }
        } else {
            if (currentMonth === 1) {
                setCurrentYear((prev) => prev - 1);
                setCurrentMonth(12);
            } else {
                setCurrentMonth((prev) => prev - 1);
            }
        }
    };

    const handleYearInput = () => {
        const year = parseInt(yearInput);
        if (year >= 2000 && year <= 2100) {
            if (
                restrict &&
                todayData &&
                (year > todayData.Year ||
                    (year === todayData.Year && currentMonth > todayData.Month))
            ) {
                setCurrentYear(todayData.Year);
                setCurrentMonth(todayData.Month);
            } else {
                setCurrentYear(year);
            }
        }
        setEditingYear(false);
    };

    const handleMonthInput = () => {
        const month = parseInt(monthInput);
        if (month >= 1 && month <= 12) {
            if (
                restrict &&
                todayData &&
                currentYear === todayData.Year &&
                month > todayData.Month
            ) {
                setCurrentMonth(todayData.Month);
            } else {
                setCurrentMonth(month);
            }
        }
        setEditingMonth(false);
    };

    const renderCalendarDays = () => {
        if (!monthData) return null;

        const days = [];
        const totalCells = 35;
        let dayCounter = 1;
        let startDayOffset = new Date(monthData[0].EnglishDate).getDay();
        for (let i = 0; i < startDayOffset; i++) {
            days.push(<div key={i} className="h-8" />);
        }
        while (dayCounter <= monthData.length) {
            if (startDayOffset >= 35) {
                startDayOffset %= 7;
            }
            const day = dayCounter;
            const isToday =
                todayData &&
                day === todayData.Day &&
                currentMonth === todayData.Month &&
                currentYear === todayData.Year;
            const isSelected =
                selectedDate &&
                day === selectedDate.day &&
                currentMonth === selectedDate.month &&
                currentYear === selectedDate.year;
            const isFutureDate =
                restrict &&
                todayData &&
                (currentYear > todayData.Year ||
                    (currentYear === todayData.Year &&
                        currentMonth > todayData.Month) ||
                    (currentYear === todayData.Year &&
                        currentMonth === todayData.Month &&
                        day > todayData.Day));

            days[startDayOffset++] = (
                <button
                    key={startDayOffset + dayCounter++}
                    onClick={() => !isFutureDate && handleDateSelect(day)}
                    disabled={isFutureDate}
                    className={getDayClass(isToday, isSelected, isFutureDate)}
                >
                    {day}
                </button>
            );
        }

        
        return days;
    };

    return (
        <div ref={calendarRef} className="relative w-48">
            <div
                className="flex justify-between items-center cursor-pointer border rounded px-3 py-2 shadow-sm bg-white w-full"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="text-gray-700">
                    {selectedDate ? formatDate(selectedDate) : "Select date..."}
                </span>
                {isOpen ? (
                    <i className=" bx bxs-chevron-up h-4 w-4" />
                ) : (
                    <i className=" bx bxs-chevron-down h-4 w-4" />
                )}
            </div>

            {isOpen && (
                <div className="absolute top-full mt-1 border rounded-lg p-4 shadow-xl bg-white w-72 z-50">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={() => handleMonthChange("prev")}
                            disabled={isLoading}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <i className=" bx bxs-chevron-left h-4 w-4" />
                        </button>

                        <div className="flex gap-2 items-center">
                            {editingMonth ? (
                                <input
                                    value={monthInput}
                                    onChange={(e) =>
                                        setMonthInput(e.target.value)
                                    }
                                    onBlur={handleMonthInput}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleMonthInput()
                                    }
                                    className="w-16 text-center border rounded p-1"
                                    autoFocus
                                />
                            ) : (
                                <span
                                    onClick={() => {
                                        if (editable) {
                                            setEditingMonth(true);
                                            setMonthInput(
                                                currentMonth.toString()
                                            );
                                        }
                                    }}
                                    className={
                                        editable
                                            ? "cursor-pointer hover:text-blue-600 rounded border p-1"
                                            : ""
                                    }
                                >
                                    {MONTHS[currentMonth - 1]}
                                </span>
                            )}

                            {editingYear ? (
                                <input
                                    value={yearInput}
                                    onChange={(e) =>
                                        setYearInput(e.target.value)
                                    }
                                    onBlur={handleYearInput}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleYearInput()
                                    }
                                    className="w-16 text-center border rounded p-1"
                                    autoFocus
                                />
                            ) : (
                                <span
                                    onClick={() => {
                                        if (editable) {
                                            setEditingYear(true);
                                            setYearInput(
                                                currentYear.toString()
                                            );
                                        }
                                    }}
                                    className={
                                        editable
                                            ? "cursor-pointer hover:text-blue-600 border p-1 rounded"
                                            : ""
                                    }
                                >
                                    {currentYear}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => handleMonthChange("next")}
                            disabled={
                                isLoading ||
                                (restrict &&
                                    todayData &&
                                    currentYear === todayData.Year &&
                                    currentMonth === todayData.Month)
                            }
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i className=" bx bxs-chevron-right h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {WEEKDAYS.map((day) => (
                            <div
                                key={day}
                                className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-40 w-full">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-7 gap-1">
                            {renderCalendarDays()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar;
