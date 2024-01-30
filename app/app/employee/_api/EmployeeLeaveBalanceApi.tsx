import { faker } from "@faker-js/faker";

export type EmployeeLeaveBalanceDetail = {
    id: number;
    name: string;
    leaveType: string;
    leaveBalance: number;
    expiryDate: Date;
    email: string;
    isExpanded: boolean;
    alBalance: number;
    mcBalance: number;
    rlBalance: number;
    otherBalance: number;
    alExpiryDate: Date;
    mcExpiryDate: Date;
    rlExpiryDate: Date;
    otherExpiryDate: Date;
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
        id: faker.number.int(),
        name: faker.person.fullName(),
        leaveType: leaveType,
        leaveBalance: faker.number.int({
            min: 0,
            max: 50
        }),
        expiryDate: faker.date.anytime(),
        email: faker.internet.email(),
        isExpanded: false,
        alBalance: faker.number.int({
            min: 0,
            max: 14
        }),
        mcBalance: faker.number.int({
            min: 0,
            max: 14
        }),
        rlBalance: faker.number.int({
            min: 0,
            max: 5.5
        }),
        otherBalance: faker.number.int({
            min: 0,
            max: 5
        }),
        alExpiryDate: faker.date.anytime(),
        mcExpiryDate: faker.date.anytime(),
        rlExpiryDate: faker.date.anytime(),
        otherExpiryDate: faker.date.anytime(),
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