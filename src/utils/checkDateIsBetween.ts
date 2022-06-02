export default function checkDateIsBetween(from: any, to: any, check: any) {
    from = new Date(from);
    to = new Date(to);
    check = new Date(check);
    return (
        check.getTime() >= from.getTime() && check.getTime() <= to.getTime()
    );
}