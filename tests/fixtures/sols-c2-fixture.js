const R = String.raw;
const MEMSUM = (cleanup) => R`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int *a = malloc((size_t)n * sizeof *a);
    if (!a) return 1;
    long sum = 0;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &a[i]) != 1) { free(a); return 1; }
        sum += a[i];
    }
    printf("%ld\n", sum);
` + cleanup + R`
    return 0;
}
`;
module.exports = {
  "c2-fx-basics/0": { sol: "#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    if (scanf(\"%d %d\", &a, &b) != 2) return 1;\n    printf(\"%d\\n\", a + b);\n    return 0;\n}\n",
    wrong: ["#include <stdio.h>\n\nint main(void) {\n    puts(\"7\");\n    return 0;\n}\n", "#include <iostream>\nint main() { int a, b; std::cin >> a >> b; std::cout << a + b << \"\\n\"; }\n"] },
  "c2-fx-basics/1": { sol: "#include <stdio.h>\n\nint main(void) {\n    printf(\"42\\n\");\n    return 0;\n}\n", wrong: ["#include <stdio.h>\n\nint main(void) {\n    int x;\n    printf(\"42\\n\");\n    return 0;\n}\n"] },
  "c2-fx-memory/0": { sol: MEMSUM("    free(a);"), wrong: [MEMSUM("")] },
  "c2-fx-memory/1": { sol: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    char *s = malloc(8);\n    if (!s) return 1;\n    s[0] = 'O'; s[1] = 'K'; s[2] = '\\0';\n    puts(s);\n    free(s);\n    return 0;\n}\n",
    wrong: ["#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    char *s = malloc(8);\n    if (!s) return 1;\n    s[0] = 'O'; s[1] = 'K'; s[2] = '\\0';\n    puts(s);\n    free(s);\n    char local = 'x';\n    free(&local);\n    return 0;\n}\n"] },
  "c2-fx-memory/2": { sol: "// === stats.h ===\n#ifndef STATS_H\n#define STATS_H\ndouble average(const int *a, int n);\n#endif\n\n// === stats.c ===\n#include \"stats.h\"\n\ndouble average(const int *a, int n) {\n    long sum = 0;\n    for (int i = 0; i < n; i++) sum += a[i];\n    return (double)sum / n;\n}\n\n// === main.c ===\n#include <stdio.h>\n#include \"stats.h\"\n\nint main(void) {\n    int a[] = {1, 2, 4};\n    printf(\"%.2f\\n\", average(a, 3));\n    return 0;\n}\n",
    wrong: ["// === stats.h ===\n#ifndef STATS_H\n#define STATS_H\ndouble average(const int *a, int n);\n#endif\n\n// === stats.c ===\n#include \"stats.h\"\n\ndouble average(const int *a, int n) {\n    long sum = 0;\n    for (int i = 0; i < n; i++) sum += a[i];\n    return sum / n;\n}\n\n// === main.c ===\n#include <stdio.h>\n#include \"stats.h\"\n\nint main(void) {\n    int a[] = {1, 2, 4};\n    printf(\"%.2f\\n\", average(a, 3));\n    return 0;\n}\n"] },
};
