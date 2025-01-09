import { useState, useRef, useEffect } from "react";
import NepaliDate from "nepali-date-converter";
import customAxios from "./http";

function Calender({ restrict = false, getDate, defaultDate, editable = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(
        defaultDate
            ? Number(defaultDate.month)
            : Number(new NepaliDate().format("MM"))
    );
    const [currentYear, setCurrentYear] = useState(
        defaultDate
            ? Number(defaultDate.year)
            : Number(new NepaliDate().format("YYYY"))
    );
    const today = {
        month: Number(new NepaliDate().format("MM")),
        year: Number(new NepaliDate().format("YYYY")),
        day: Number(new NepaliDate().format("DD")),
    };

    const [selectedDate, setSelectedDate] = useState({
        year: currentYear,
        month: currentMonth,
        day: defaultDate
            ? Number(defaultDate.day)
            : Number(new NepaliDate().format("DD")),
    });
    const [renderedDays, setRenderedDays] = useState([]);

    const divElemt = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!divElemt.current) {
                return;
            }
            if (!divElemt.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handler, true);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    const monthLabels = [
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

    const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formatDate = ({ year, month, day }) => {
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    const generateCalendarDays = (firstDay, totalDays) => {
        const daysArray = new Array(35).fill(null);
        let dayCounter = 1;
        let startIndex = firstDay;
        while (dayCounter <= totalDays) {
            if (startIndex >= 35) {
                startIndex %= 7;
            }
            daysArray[startIndex++] = dayCounter++;
        }
        return daysArray;
    };

    const handleClickDay = (day) => {
        setSelectedDate({ year: currentYear, month: currentMonth, day: day });
        getDate({
            year: selectedDate.year.toString(),
            month:
                currentMonth < 10
                    ? `0${currentMonth}`
                    : currentMonth.toString(),
            day: day < 10 ? `0${day}` : day.toString(),
        });
        setIsOpen(false);
    };

    const fetchDays = async () => {
        try {
            setLoading(true);
            const response = await customAxios.get(
                `DayList/GetList/${currentYear}/${currentMonth}`
            );
            console.log(response.data);
            const firstDay = new Date(response.data[0].EnglishDate).getDay();
            const totalDays = response.data.length;
            const days = generateCalendarDays(firstDay, totalDays);
            console.log(days);
            const renderedData = days.map((day, index) => {
                return (
                    <div
                        key={index}
                        className={`${day && "hover:bg-gray-200"} ${
                            day
                                ? restrict &&
                                  day > today.day &&
                                  currentMonth == today.month &&
                                  currentYear == today.year
                                    ? "cursor-not-allowed  border bg-gray-300 hover:bg-gray-300"
                                    : "cursor-pointer border"
                                : ""
                        } p-1 text-center`}
                        onClick={() => {
                            day &&
                            !(
                                restrict &&
                                day > today.day &&
                                currentMonth == today.month &&
                                currentYear == today.year
                            )
                                ? handleClickDay(day)
                                : null;
                        }}
                    >
                        {day}
                    </div>
                );
            });
            console.log(renderedData);
            setRenderedDays(renderedData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateMonth = async (direction) => {
        setCurrentMonth((prevMonth) => {
            let newMonth = direction === "next" ? prevMonth + 1 : prevMonth - 1;
            if (newMonth > 12) {
                setCurrentYear((prevYear) => prevYear + 1);
                newMonth = 1;
            } else if (newMonth < 1) {
                setCurrentYear((prevYear) => prevYear - 1);
                newMonth = 12;
            }
            return newMonth;
        });
    };

    useEffect(() => {
        fetchDays();
    }, [currentYear, currentMonth]);

    const allowNextMonth = !(
        restrict &&
        currentYear === today.year &&
        currentMonth === today.month
    );

    return (
        <div ref={divElemt} className="relative w-48">
            <div
                className="flex justify-between items-center cursor-pointer border rounded px-3 py-2 shadow bg-white w-full select-none"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selectedDate.year ? formatDate(selectedDate) : "Select ..."}
                <i
                    className={`bx ${
                        isOpen ? "bxs-chevron-up" : "bxs-chevron-down"
                    }`}
                ></i>
            </div>
            {isOpen && (
                <div className="absolute top-full border rounded p-3 shadow-xl bg-white w-72 text-gray-700 select-none">
                    <div className="flex flex-row  justify-between items-center mb-2">
                        <i
                            className="bx bxs-chevron-left p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() =>
                                loading ? null : updateMonth("prev")
                            }
                        />
                        <div className="flex flex-row border px-3 py-1 gap-3">
                            <p>{monthLabels[currentMonth - 1]}</p>
                            <div className="border-r"></div>
                            <p>{currentYear}</p>
                        </div>
                        <i
                            className={`bx  p-2  ${
                                allowNextMonth
                                    ? "bxs-chevron-right  hover:bg-gray-200 cursor-pointer"
                                    : ""
                            }`}
                            onClick={() =>
                                allowNextMonth && !loading
                                    ? updateMonth("next")
                                    : null
                            }
                        />
                    </div>
                    <div>
                        <div className="grid grid-cols-7 mb-2">
                            {weekdayLabels.map((label, index) => (
                                <p
                                    className="justify-center flex items-center "
                                    key={index}
                                >
                                    {label}
                                </p>
                            ))}
                        </div>
                        {!loading ? (
                            <div className="grid grid-cols-7 ">
                                {renderedDays}
                            </div>
                        ) : (
                            <div className="h-48  flex justify-center items-center ">
                                Loading...
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calender;
