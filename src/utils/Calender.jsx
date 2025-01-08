import { useState, useRef, useEffect } from "react";
import NepaliDate from "nepali-date-converter";
import customAxios from "./http";

function Calender({ language = "np", restrict = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dates, setDates] = useState([]);

    const [currentMonth, setCurrentMonth] = useState(
        Number(new NepaliDate().format("MM"))
    );
    const [currentYear, setCurrentYear] = useState(
        Number(new NepaliDate().format("YYYY"))
    );
    const [today, setToday] = useState({
        month: Number(new NepaliDate().format("MM")),
        year: Number(new NepaliDate().format("YYYY")),
    });

    const [selectedDate, setSelectedDate] = useState({
        year: currentYear,
        month: currentMonth,
        day: Number(new NepaliDate().format("DD")),
    });
    const [firstDay, setFirstDay] = useState(new Date().getDay());

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

    const monthLabels =
        language === "np"
            ? [
                  "बैशाख",
                  "जेठ",
                  "असार",
                  "साउन",
                  "भदौ",
                  "असोज",
                  "कार्तिक",
                  "मंसिर",
                  "पुष",
                  "माघ",
                  "फागुन",
                  "चैत",
              ]
            : [
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

    const weekdayLabels =
        language === "np"
            ? ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"]
            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formatDate = ({ year, month, day }) => {
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    const fetchDays = async () => {
        try {
            const response = await customAxios.get(
                `DayList/GetList/${currentYear}/${currentMonth}`
            );

            setDates(response.data);
            setFirstDay(new Date(response.data[0].EnglishDate).getDay());
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async () => {
        setIsOpen((prev) => {
            if (!prev) fetchDays();
            return !prev;
        });
        console.log(generateCalendarDays(firstDay, dates.length));
        console.log(dates);
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
        await fetchDays();
    };

    useEffect(() => {
        fetchDays();
    }, [currentYear, currentMonth]);

    const handleClickDay = (day) => {
        if (!day) return;
        setSelectedDate({ year: currentYear, month: currentMonth, day: day });
    };

    const generateCalendarDays = (firstDay, totalDays) => {
        console.log("from generateCalendarDays", firstDay, totalDays);
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

    const renderedDays = generateCalendarDays(firstDay, dates.length).map(
        (day, index) => {
            return (
                <div
                    key={index}
                    className={`${
                        day
                            ? selectedDate.day === day &&
                              currentMonth == selectedDate.month &&
                              currentYear == selectedDate.year
                                ? "bg-blue-500 text-white hover:bg-blue-500"
                                : "hover:bg-gray-200"
                            : ""
                    } ${day ? "cursor-pointer border" : ""} p-1 text-center`}
                    onClick={() => {
                        day ? handleClickDay(day) : null;
                    }}
                >
                    {day}
                </div>
            );
        }
    );

    const allowNextMonth = !(
        restrict &&
        currentYear === today.year &&
        currentMonth === today.month
    );

    return (
        <div ref={divElemt} className="relative w-48">
            <div
                className="flex justify-between items-center cursor-pointer border rounded px-3 py-2 shadow bg-white w-full "
                onClick={handleClick}
            >
                {selectedDate.year ? formatDate(selectedDate) : "Select ..."}
                <i
                    className={`bx ${
                        isOpen ? "bxs-chevron-up" : "bxs-chevron-down"
                    }`}
                ></i>
            </div>
            {isOpen && (
                <div className="absolute top-full border rounded p-3 shadow bg-white w-72 text-gray-700 select-none">
                    <div className="flex flex-row  justify-between items-center mb-2">
                        <i
                            className="bx bxs-chevron-left p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => updateMonth("prev")}
                        ></i>
                        <div className="flex flex-row border px-3 py-1 gap-3">
                            <p>{monthLabels[currentMonth - 1]}</p>
                            <div className="border-r"></div>
                            <p>{currentYear}</p>
                        </div>
                        <i
                            className={`bx  p-2 cursor-pointer ${
                                allowNextMonth
                                    ? "bxs-chevron-right  hover:bg-gray-200"
                                    : ""
                            }`}
                            onClick={() =>
                                allowNextMonth ? updateMonth("next") : null
                            }
                        ></i>
                    </div>
                    <div>
                        <div className="flex flex-row justify-between items-center mb-2">
                            {weekdayLabels.map((label, index) => (
                                <p key={index}>{label}</p>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 ">{renderedDays}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calender;
