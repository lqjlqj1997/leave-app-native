import { faker } from "@faker-js/faker";

export type EmployeeDetail = {
    id:string;
    email: string;
    name: string;
    address: string;
    dateOfBirth: Date;
    status: "Active" | "Inactive";
    // maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
    maritalStatus: "Single" | "Married";
    phoneNumber: string;
    role: "Employee" | "Manager" | "Admin"
};

const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newEmployeeDetail = (): EmployeeDetail => {
    // const leaveType = faker.helpers.shuffle([
    //     "Annual Leave",
    //     "Medical Leave",
    //     "Replacement Leave",
    //     "Other Leave",
    // ])[0]!;
    return {
        id: "id",
        email: faker.internet.email(),
        name: faker.person.fullName(),
        address: faker.lorem.sentence(30),
        dateOfBirth: faker.date.between({
            from: '1975-01-01T00:00:00.000Z',
            to: '1997-12-31T00:00:00.000Z'
        }),
        status: faker.helpers.shuffle<EmployeeDetail["status"]>([
            "Active",
            "Inactive"
        ])[0]!,
        maritalStatus: faker.helpers.shuffle<EmployeeDetail["maritalStatus"]>([
            "Single",
            "Married"
        ])[0]!,
        phoneNumber: faker.phone.number('+60(1#) ### ####'),
        role: faker.helpers.shuffle<EmployeeDetail["role"]>([
            "Employee", 
            "Manager",
            "Admin"
        ])[0]!,
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): EmployeeDetail[] => {
        const len = lens[depth]!;
        return range(len).map((d): EmployeeDetail => {
            return newEmployeeDetail();
        });
    };

    return makeDataLevel();
}

const data = makeData(25);

export async function fetchEmployeeData() {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));

    // if (options.email) {
    //     return data.filter((leave) => leave.email === options.email);
    // }
    return data;
}