import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const AttendanceChart = ({ lectureWeekly, studentsWeekly }) => {
    const [attendanceLecStu, setAttendanceLecStu] = useState(true);
    return (
        <div className="px-5 space-y-8 relative text-gray-text ">
            <div className="flex space-x-10 border-b pt-5">
                <button
                    onClick={() => setAttendanceLecStu(true)}
                    className={`${
                        attendanceLecStu
                            ? "after:bg-primary text-primary"
                            : "after:bg-gray-200"
                    } tab`}>
                    <h1 className="font-bold text-sm">My Attendance</h1>
                </button>
                <button
                    onClick={() => setAttendanceLecStu(false)}
                    className={`${
                        !attendanceLecStu
                            ? "after:bg-primary text-primary"
                            : "after:bg-gray-200"
                    } tab`}>
                    <h1 className="font-bold text-sm">Students</h1>
                </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={attendanceLecStu ? "Lecturer" : "Student"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-[16rem]">
                    <div className="h-[16rem] flex overflow-hidden relative  space-x-8 w-full">
                        <div className="flex flex-col text-xs">
                            <div className="chart-bar before:h-0">100</div>
                            <div className="chart-bar before:h-0">80</div>
                            <div className="chart-bar before:h-0">60</div>
                            <div className="chart-bar before:h-0">40</div>
                            <div className="chart-bar before:h-0">20</div>
                        </div>
                        <div className="flex z-10 space-x-10 h-[16rem] items-end overflow-y-auto relative ">
                            {attendanceLecStu
                                ? lectureWeekly.map((data, index) => (
                                      <div
                                          className="flex flex-col-reverse h-full"
                                          key={index}>
                                          {data.total === 0 && (
                                              <div className="w-14 flex items-center justify-center">
                                                  <span className="text-xs text-black-text font-bold">
                                                      {data.total}%
                                                  </span>
                                              </div>
                                          )}
                                          {data.present_percentage > 0 && (
                                              <div
                                                  className={`bg-secondary w-14 flex items-center justify-center  ${
                                                      data.absent_percentage > 0
                                                          ? "rounded-b-lg"
                                                          : "rounded-lg"
                                                  }`}
                                                  style={{
                                                      height:
                                                          data.present_percentage +
                                                          "%",
                                                  }}>
                                                  <span className="text-xs text-black-text font-bold">
                                                      {data.present_percentage}%
                                                  </span>
                                              </div>
                                          )}
                                          {data.absent_percentage > 0 && (
                                              <div
                                                  className={`bg-danger w-14 flex items-center justify-center  ${
                                                      data.absent_percentage > 0
                                                          ? "rounded-t-lg"
                                                          : "rounded-lg"
                                                  }`}
                                                  style={{
                                                      height:
                                                          data.absent_percentage +
                                                          "%",
                                                  }}>
                                                  <span className="text-xs text-white font-bold">
                                                      {data.absent_percentage}%
                                                  </span>
                                              </div>
                                          )}
                                      </div>
                                  ))
                                : studentsWeekly.map((data, index) => (
                                      <div
                                          className="flex flex-col-reverse h-full"
                                          key={index}>
                                          {data.total === 0 && (
                                              <div className="w-14 flex items-center justify-center">
                                                  <span className="text-xs text-black-text font-bold">
                                                      {data.total}%
                                                  </span>
                                              </div>
                                          )}
                                          {data.present_percentage > 0 && (
                                              <div
                                                  className={`bg-secondary w-14 flex items-center justify-center  ${
                                                      data.absent_percentage > 0
                                                          ? "rounded-b-lg"
                                                          : "rounded-lg"
                                                  }`}
                                                  style={{
                                                      height:
                                                          data.present_percentage +
                                                          "%",
                                                  }}>
                                                  <span className="text-xs text-black-text font-bold">
                                                      {data.present_percentage}%
                                                  </span>
                                              </div>
                                          )}
                                          {data.absent_percentage > 0 && (
                                              <div
                                                  className={`bg-danger w-14 flex items-center justify-center  ${
                                                      data.present_percentage >
                                                      0
                                                          ? "rounded-t-lg"
                                                          : "rounded-lg"
                                                  }`}
                                                  style={{
                                                      height:
                                                          data.absent_percentage +
                                                          "%",
                                                  }}>
                                                  <span className="text-xs text-white font-bold">
                                                      {data.absent_percentage}%
                                                  </span>
                                              </div>
                                          )}
                                      </div>
                                  ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-200 flex space-x-8 w-full">
                        <div className="w-[25px] text-xs">0</div>
                        <div className="space-x-10 flex">
                            {lectureWeekly.map((lec, index) => (
                                <div
                                    key={index}
                                    className="w-14 text-sm text-center">
                                    Week
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="border-t flex items-center space-x-8 justify-center text-black-text font-bold py-3">
                <div className="flex items-center space-x-2">
                    <span className="w-6 h-[0.3rem] bg-secondary block rounded-full"></span>
                    <span>Present</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="w-6 h-[0.3rem] bg-danger block rounded-full"></span>
                    <span>Absent</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceChart;
