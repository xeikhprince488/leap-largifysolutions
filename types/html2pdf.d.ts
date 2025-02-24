declare module "html2pdf.js" {
    interface Html2PdfOptions {
      margin?: number | [number, number, number, number]
      filename?: string
      image?: {
        type?: string
        quality?: number
      }
      html2canvas?: {
        scale?: number
        useCORS?: boolean
        letterRendering?: boolean
        scrollY?: number
      }
      jsPDF?: {
        unit?: string
        format?: string
        orientation?: "portrait" | "landscape"
        compress?: boolean
      }
      pagebreak?: {
        mode?: string[]
        before?: string[]
        after?: string[]
        avoid?: string[]
      }
    }
  
    interface Html2PdfInstance {
      set: (options: Html2PdfOptions) => Html2PdfInstance
      from: (element: HTMLElement) => Html2PdfInstance
      save: () => Promise<void>
      output: (type: string) => Promise<string>
    }
  
    function html2pdf(): Html2PdfInstance
    function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Html2PdfInstance
  
    export = html2pdf
  }
  
  