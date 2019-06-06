
export function getLevelFromLocal(levelRequest?: string) {
    // console.log('---CASE--', levelRequest);
    switch (levelRequest) {
        case 'N1':
            return 'grammars_N1';
            break;
        case 'N2':
            return 'grammars_N2';
            break;
        case 'N3':
            return 'grammars_N3';
            break;
        case 'N4':
            return 'grammars_N4';
            break;
        case 'N5':
            return 'grammars_N5';
            break;
        default:
            return 'grammars_N3';
            break;
    }
}