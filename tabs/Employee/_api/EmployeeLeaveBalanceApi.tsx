import { faker } from "@faker-js/faker";

export type EmployeeLeaveBalanceDetail = {
    id: string;
    name: string;
    leaveType: string;
    leaveBalance: number;
    expiryDate: Date;
    email: string
}

const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newEmployeeLeaveBalanceDetail = (): EmployeeLeaveBalanceDetail => {
    const leaveType = faker.helpers.shuffle([
        "Annual Leave",
        "Medical Leave",
        "Replacement Leave",
        "Other Leave",
    ])[0]!;
    return {
        id: "id",
        name: faker.person.fullName(),
        leaveType: leaveType,
        leaveBalance: faker.number.int({
            min: 0,
            max: 20
        }),
        expiryDate: faker.date.anytime(),
        email: faker.internet.email()
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): EmployeeLeaveBalanceDetail[] => {
        const len = lens[depth]!;
        return range(len).map((d): EmployeeLeaveBalanceDetail => {
            return newEmployeeLeaveBalanceDetail();
        });
    };

    return makeDataLevel();
}

const data = makeData(25);

export async function fetchEmployeeLeaveBalanceData() {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));

    // if (options.leaveType) {
    //     return data.filter((leave) => leave.leaveType === options.leaveType);
    // }
    return data;
}