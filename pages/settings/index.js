import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../src/lib/axios";
import Card from "../../components/Card";
import HeadTitle from "../../components/HeadTitle";
import { useState } from "react";
import SetSemester from "../../components/Settings/SetSemster";
import EditSetSemester from "../../components/Settings/EditSetSemester";
import { useSemester } from "../../src/hooks/semester";
import Profile from "../../components/Settings/Profile";
import Button from "../../components/Button";

const Settings = ({ promotion }) => {
    const { semester, promoteStudent, loading } = useSemester();
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const handlePromotion = event => {
        event.preventDefault();
        promoteStudent({
            id: semester?.id,
            setErrors,
            setStatus,
        });
    };
    return (
        <AppLayout header="Settings">
            <HeadTitle title="Settings" />

            <div className="space-y-8">
                {/* Profile */}
                <Profile />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8">
                    <div className="col-span-1 xl:col-span-2 ">
                        {semester ? (
                            <EditSetSemester currentSemester={semester} />
                        ) : (
                            <SetSemester />
                        )}
                    </div>
                    <div className="col-span-1 xl:col-span-3">
                        {semester?.semester === "second" && (
                            <Card
                                header={
                                    <h1 className="text-black-text font-extrabold capitalize">
                                        Student Promotion
                                    </h1>
                                }>
                                <div className="space-y-3">
                                    {promotion.data === "set" ? (
                                        <>
                                            {semester?.promotion_status ===
                                            "open" ? (
                                                <div>Promotion is done</div>
                                            ) : (
                                                <form
                                                    onSubmit={handlePromotion}>
                                                    <div></div>
                                                    <div className="flex justify-end">
                                                        <Button
                                                            type="submit"
                                                            loader={loading}>
                                                            Promote
                                                        </Button>
                                                    </div>
                                                </form>
                                            )}
                                        </>
                                    ) : (
                                        <div>
                                            All Module Assessment is not
                                            submitted
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Settings;

export async function getServerSideProps() {
    const promotionResponse = await axios.get("api/v1/promotion/check");
    const promotion = promotionResponse.data;
    return {
        props: {
            promotion,
        },
    };
}
