export { resolveCoordinates };

const resolveCoordinates = (event: MouseEvent): [number, number] => [
    event.clientX,
    event.clientY
];
