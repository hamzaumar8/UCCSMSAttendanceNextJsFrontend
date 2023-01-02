export const levelLoadOptions = async (inputText, callback) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lev/backend?s=${inputText}`,
    );
    const json = await response.json();
    callback(
        json.map(i => ({
            label: i.name,
            value: i.id,
        })),
    );
};

export const lecturerLoadOptions = async (inputText, callback) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lect/backend?s=${inputText}`,
    );
    const json = await response.json();
    callback(
        json.map(i => ({
            label:
                i.other_name != null
                    ? `${i.title} ${i.first_name} ${i.other_name} ${i.surname} (${i.staff_id})`
                    : `${i.title} ${i.first_name} ${i.surname} (${i.staff_id})`,
            value: i.id,
        })),
    );
};

export const courseRepLoadOptions = async (inputText, callback) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stud/backend?s=${inputText}`,
    );
    const json = await response.json();
    callback(
        json.map(i => ({
            label: `${i.full_nme} ${i.surname} ${
                i.other_name && i.other_name + " "
            } (${i.index_number})`,
            value: i.id,
        })),
    );
};

export const moduleLoadOption = async (inputText, callback) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mod_bank/backend?s=${inputText}`,
    );
    const json = await response.json();
    callback(
        json.map(i => ({
            label: `${i.title} (${i.code})`,
            value: i.id,
        })),
    );
};
