import { faker } from "@faker-js/faker";

export type LeaveApplicationDetail = {
    id: string;
    username: string;
    leaveType: string;
    reason: string;
    leaveDate: Date;
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
        id: `Id-${faker.number.int(100000)}`,
        username: faker.person.fullName(),
        leaveType: leaveType,
        reason: faker.lorem.sentence(5),
        leaveDate: startDate,
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

const data = makeData(10);

export async function fetchLeaveApplication(options: { selectedDate?: Date }) {
    // Simulate some network latency
    await new Promise((r) => setTimeout(r, 500));
    const selectedDate = options.selectedDate;
    if (selectedDate instanceof Date) {
        return data.filter(
            (LeaveApp) => LeaveApp.leaveDate.getTime() == selectedDate.getTime()
        );
    }
    return data;
}
