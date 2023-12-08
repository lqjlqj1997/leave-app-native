import { faker } from "@faker-js/faker";

export type LeaveBalanceDetail = {
    leaveType: string;
    leaveDescription: string;
    balance: number;
    expiredDate: Date;
    status: "Active" | "Expired" | "Deducted";
};

const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newLeaveBalanceDetail = (): LeaveBalanceDetail => {
    const leaveType = faker.helpers.shuffle([
        "Annual Leave",
        "Medical Leave",
        "Replacement Leave",
        "Other Leave",
    ])[0]!;
    return {
        leaveType: leaveType,
        leaveDescription: `${leaveType} - ${faker.lorem.sentence(5)}`,
        balance: faker.number.int(20),
        expiredDate: faker.date.anytime(),
        status: faker.helpers.shuffle<LeaveBalanceDetail["status"]>([
            "Active",
            "Expired",
            "Deducted",
        ])[0]!,
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): LeaveBalanceDetail[] => {
        const len = lens[depth]!;
        return range(len).map((d): LeaveBalanceDetail => {
            return newLeaveBalanceDetail();
        });
    };

    return makeDataLevel();
}

const data = makeData(100);

export async function fetchLeaveBalance(options: { leaveType?: string }) {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));

    if (options.leaveType) {
        return data.filter((leave) => leave.leaveType === options.leaveType);
    }
    return data;
}
