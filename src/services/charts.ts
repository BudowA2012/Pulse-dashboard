export class Chart {
  private id: string;

  private data: number[] = [];

  private maxPoints = 40;

  constructor(id: string) {
    this.id = id;
  }

  add(value: number) {
    this.data.push(value);

    if (this.data.length > this.maxPoints) {
      this.data.shift();
    }

    this.draw();
  }

  private draw() {
    const element = document.getElementById(this.id);

    if (!element) return;

    const width = 320;

    const height = 90;

    const points = this.data
      .map((value, index) => {
        const x = (index / (this.maxPoints - 1)) * width;

        const y = height - (value / 100) * height;

        return `${x},${y}`;
      })
      .join(" ");

    element.innerHTML = `

        <svg
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        >

        <polyline

        points="${points}"

        fill="none"

        stroke="currentColor"

        stroke-width="3"

        stroke-linecap="round"

        stroke-linejoin="round"

        />

        </svg>

        `;
  }
}
