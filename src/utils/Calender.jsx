import { useState, useRef, useEffect, useCallback } from "react";
import customAxios from "./http";

function Calender({ restrict = false, getDate, value, editable = true }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toggleMonth, setToggleMonth] = useState(false);
    const [toggleYear, setToggleYear] = useState(false);
    const [firstDay, setFirstDay] = useState(0);
    const [totalDays, setTotalDays] = useState(0);

    // State for today, current month/year, and selected date
    const [today, setToday] = useState({});
    const [currentMonth, setCurrentMonth] = useState(
        Number(value?.month !== 0 ? value?.month : 1)
    );
    const [currentYear, setCurrentYear] = useState(
        Number(value?.year !== 0 ? value?.year : 2080)
    );
    const [selectedDate, setSelectedDate] = useState({
        year: Number(value?.year !== 0 ? value?.year : currentYear),
        month: Number(value?.month !== 0 ? value?.month : currentMonth),
        day: Number(value?.day !== 0 ? value?.day : 1),
    });

    const [renderedDays, setRenderedDays] = useState([]);
    const [monthInput, setMonthInput] = useState(currentMonth);
    const [yearInput, setYearInput] = useState(currentYear);
    const [days, setDays] = useState([]);

    const divElemt = useRef();

    const fetchTodayDate = useCallback(async () => {
        try {
            const response = await customAxios.get(
                `Daylist/GetItem/${new Date().getFullYear()}-${
                    new Date().getMonth() + 1
                }-${new Date().getDate()}`
            );

            const data = response.data;
            setToday({ year: data.Year, month: data.Month, day: data.Day });
            if (!value.month && !value.year) {
                setCurrentMonth(data.Month);
                setCurrentYear(data.Year);
            }
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch today's date:", error);
        }
    }, []);
    useEffect(() => {
        fetchTodayDate(); // Fetch today's date on mount
    }, [fetchTodayDate]);

    useEffect(() => {
        if (value) {
            setCurrentMonth(Number(value.month));
            setCurrentYear(Number(value.year));
            setSelectedDate({
                year: Number(value.year),
                month: Number(value.month),
                day: Number(value.day),
            });
        }
    }, [value]);

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
            document.removeEventListener("click", handler, true);
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
            year: currentYear.toString(),
            month:
                currentMonth < 10
                    ? `0${currentMonth}`
                    : currentMonth.toString(),
            day: day < 10 ? `0${day}` : day.toString(),
        });
        setIsOpen(false);
    };

    const makeDays = async (firstDay, totalDays) => {
        setDays(generateCalendarDays(firstDay, totalDays));
        setRenderedDays(
            days.map((day, index) => {
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
            })
        );
    };

    useEffect(() => {
        makeDays(firstDay, totalDays);
    }, [days]);

    const fetchDays = async () => {
        try {
            setLoading(true);
            const response = await customAxios.get(
                `DayList/GetList/${currentYear}/${currentMonth}`
            );
            console.log("Daylist of a month: ", response.data);
            setFirstDay(new Date(response.data[0].EnglishDate).getDay());
            console.log("first day of the month", firstDay);
            setTotalDays(response.data.length);
            await makeDays(firstDay, totalDays);
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
        if (currentMonth && currentYear) {
            fetchDays();
            console.log(
                " current month and currentyear",
                currentMonth,
                currentYear
            );
            setMonthInput(currentMonth);
            setYearInput(currentYear);
        }
    }, [currentMonth, currentYear]);

    const allowNextMonth =
        today.year > 0 &&
        today.month > 0 &&
        today.day > 0 &&
        !(
            restrict &&
            currentYear === today.year &&
            currentMonth === today.month
        );

    console.log("a;llownext month?:", allowNextMonth);
    const fixMonth = () => {
        console.log("fixing month", currentYear);
        if (monthInput >= 1 && monthInput <= 12) {
            if (
                restrict &&
                currentYear === today.year &&
                monthInput > today.month
            ) {
                setCurrentMonth(today.month);
                setMonthInput(today.month);
                setCurrentYear(today.year);
            } else {
                setCurrentMonth(Number(monthInput));
            }
            setToggleMonth(false);
        } else {
            setMonthInput(currentMonth);
            setToggleMonth(false);
        }
    };

    const monthField = !editable ? (
        <p>{monthLabels[currentMonth - 1]}</p>
    ) : !toggleMonth ? (
        <p
            onClick={() => setToggleMonth((prev) => !prev)}
            className="cursor-pointer"
        >
            {monthLabels[currentMonth - 1]}
        </p>
    ) : (
        <input
            value={monthInput}
            autoFocus
            className="border-none w-6 text-center outline-none"
            onChange={(e) => setMonthInput(e.target.value)}
            onBlur={() => {
                fixMonth();
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    fixMonth();
                }
            }}
        />
    );

    const fixYear = () => {
        if (yearInput >= 2000 && yearInput <= 2100) {
            console.log(
                "fixing year",
                currentYear,
                today.year,
                yearInput,
                currentMonth,
                today.month
            );
            if (
                restrict &&
                (yearInput > today.year ||
                    (yearInput == today.year && currentMonth > today.month))
            ) {
                setCurrentMonth(today.month);
                setYearInput(today.year);
                setCurrentYear(today.year);
            } else {
                setCurrentYear(Number(yearInput));
            }
            setToggleYear(false);
        } else {
            setYearInput(currentYear);
            setToggleYear(false);
        }
    };

    const yearField = !editable ? (
        (console.log("yearField", currentYear), (<p>{currentYear}</p>))
    ) : !toggleYear ? (
        <p
            onClick={() => setToggleYear((prev) => !prev)}
            className="cursor-pointer"
        >
            {currentYear}
        </p>
    ) : (
        <input
            value={yearInput}
            autoFocus
            className="border-none w-16 text-center outline-none"
            onChange={(e) => setYearInput(e.target.value)}
            onBlur={() => {
                fixYear();
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    fixYear();
                }
            }}
        />
    );

    return (
        <div ref={divElemt} className="relative w-48">
            <div
                className="flex justify-between items-center cursor-pointer border rounded px-3 py-2 shadow bg-white w-full select-none"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {console.log(
                    "selecred date year,month,day",
                    selectedDate.year,
                    selectedDate.month,
                    selectedDate.day
                )}
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
                            {monthField}
                            <div className="border-r"></div>
                            {yearField}
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
