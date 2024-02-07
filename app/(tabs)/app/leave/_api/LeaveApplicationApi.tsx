import { faker } from "@faker-js/faker";

export type LeaveApplicationDetail = {
    leaveType: string;
    reason: string;
    startDate: Date;
    endDate: Date;
    status: "Approved" | "Past" | "New";
};

const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newLeaveBalanceDetail = (): LeaveApplicationDetail => {
    const leaveType = faker.helpers.shuffle([
        "Annual Leave",
        "Medical Leave",
        "Replacement Leave",
        "Other Leave",
    ])[0]!;
    const startDate = faker.date.between({
        from: new Date(2023, 10, 1),
        to: new Date(2023, 12, 31),
    });
    const endDate = faker.date.between({
        from: startDate,
        to: new Date(2023, 12, 31),
    });
    return {
        leaveType: leaveType,
        reason: faker.lorem.sentence(5),
        startDate: startDate,
        endDate: endDate,
        status: faker.helpers.shuffle<LeaveApplicationDetail["status"]>([
            "Approved",
            "Past",
            "New",
        ])[0]!,
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): LeaveApplicationDetail[] => {
        const len = lens[depth]!;
        return range(len).map((d): LeaveApplicationDetail => {
            return newLeaveBalanceDetail();
        });
    };

    return makeDataLevel();
}

const data = makeData(0);

export async function fetchLeaveApplication(options: { selectedDate: Date }) {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));

    if (options.selectedDate) {
        return data.filter(
            (LeaveApp) =>
                LeaveApp.startDate.getTime() <=
                    options.selectedDate.getTime() &&
                LeaveApp.endDate.getTime() >= options.selectedDate.getTime()
        );
    }
    return data;
}
