import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const AttendanceChart = ({ lectureWeekly, studentsWeekly }) => {
    const [attendanceLecStu, setAttendanceLecStu] = useState(true);
    return (
        <>
            <div className="col-span-5 md:col-span-3 bg-white relative overflow-hidden shadow-sm sm:rounded-lg transition duration-200 ease-in-out border border-primary-accent">
                <div className="p-5 sm:flex items-center justify-between border-b bg-primary-accent">
                    <div className="flex items-center justify-center space-x-4">
                        <h1 className="text-xl font-extrabold">
                            Attendance Overview
                        </h1>
                    </div>
                    <div></div>
                </div>

                <div className="px-5 space-y-8 relative text-gray-text ">
                    <div className="flex space-x-8 border-b pt-5">
                        <button
                            onClick={() => setAttendanceLecStu(true)}
                            className={`${
                                attendanceLecStu
                                    ? "after:bg-primary text-primary"
                                    : "after:bg-gray-200"
                            } tab`}>
                            <h1 className="text-lg font-bold ">Lecturers</h1>
                        </button>
                        <button
                            onClick={() => setAttendanceLecStu(false)}
                            className={`${
                                !attendanceLecStu
                                    ? "after:bg-primary text-primary"
                                    : "after:bg-gray-200"
                            } tab`}>
                            <h1 className="text-lg font-bold ">Students</h1>
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={attendanceLecStu ? "Lecturer" : "Student"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="min-h-[20rem]">
                            <div className="h-[20rem] flex overflow-hidden relative  space-x-8 w-full">
                                <div className="flex flex-col">
                                    <div className="chart-bar">100</div>
                                    <div className="chart-bar">80</div>
                                    <div className="chart-bar">60</div>
                                    <div className="chart-bar">40</div>
                                    <div className="chart-bar">20</div>
                                </div>
                                <div className="flex z-10 space-x-10 h-[20rem] items-end overflow-y-auto relative ">
                                    {attendanceLecStu
                                        ? lectureWeekly.map((data, index) => (
                                              <div
                                                  className="flex flex-col-reverse h-full"
                                                  key={index}>
                                                  {data.total === 0 && (
                                                      <div className="w-16 flex items-center justify-center">
                                                          <span className="text-xs text-black-text font-bold">
                                                              {data.total}%
                                                          </span>
                                                      </div>
                                                  )}
                                                  {data.present_percentage >
                                                      0 && (
                                                      <div
                                                          className={`bg-secondary w-16 flex items-center justify-center  ${
                                                              data.absent_percentage >
                                                              0
                                                                  ? "rounded-b-lg"
                                                                  : "rounded-lg"
                                                          }`}
                                                          style={{
                                                              height:
                                                                  data.present_percentage +
                                                                  "%",
                                                          }}>
                                                          <span className="text-xs text-black-text font-bold">
                                                              {
                                                                  data.present_percentage
                                                              }
                                                              %
                                                          </span>
                                                      </div>
                                                  )}
                                                  {data.absent_percentage >
                                                      0 && (
                                                      <div
                                                          className={`bg-danger w-16 flex items-center justify-center  ${
                                                              data.absent_percentage >
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
                                                              {
                                                                  data.absent_percentage
                                                              }
                                                              %
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
                                                      <div className="w-16 flex items-center justify-center">
                                                          <span className="text-xs text-black-text font-bold">
                                                              {data.total}%
                                                          </span>
                                                      </div>
                                                  )}
                                                  {data.present_percentage >
                                                      0 && (
                                                      <div
                                                          className={`bg-secondary w-16 flex items-center justify-center  ${
                                                              data.absent_percentage >
                                                              0
                                                                  ? "rounded-b-lg"
                                                                  : "rounded-lg"
                                                          }`}
                                                          style={{
                                                              height:
                                                                  data.present_percentage +
                                                                  "%",
                                                          }}>
                                                          <span className="text-xs text-black-text font-bold">
                                                              {
                                                                  data.present_percentage
                                                              }
                                                              %
                                                          </span>
                                                      </div>
                                                  )}
                                                  {data.absent_percentage >
                                                      0 && (
                                                      <div
                                                          className={`bg-danger w-16 flex items-center justify-center  ${
                                                              data.absent_percentage >
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
                                                              {
                                                                  data.absent_percentage
                                                              }
                                                              %
                                                          </span>
                                                      </div>
                                                  )}
                                              </div>
                                          ))}
                                </div>
                            </div>
                            <div className="border-t border-gray-200 flex space-x-8 w-full">
                                <div className="w-[30px]">0</div>
                                <div className="space-x-10 flex">
                                    {lectureWeekly.map((lec, index) => (
                                        <div
                                            key={index}
                                            className="w-16 text-sm text-center">
                                            week
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <div className="border-t flex items-center space-x-8 justify-center text-black-text font-bold py-3">
                            <div className="flex items-center space-x-2">
                                <span className="w-8 h-[0.4rem] bg-secondary block rounded-full"></span>
                                <span>Present</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-8 h-[0.4rem] bg-danger block rounded-full"></span>
                                <span>Absent</span>
                            </div>
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default AttendanceChart;
