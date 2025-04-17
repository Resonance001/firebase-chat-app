export const getRoomId = (userId1: string, userId2: string) => {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('-');

    return roomId;
};

export const formatDate = (date: any) => {
    var day = date.getDate();
    var monthName = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    var month = monthName[date.getMonth()];

    var formattedDate = day + ' ' + month;
    return formattedDate;
};
