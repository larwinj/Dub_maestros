from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import json

def create_pdf_with_text(title, paragraph, filename=r'L:\CMR\Backend\out\text.pdf'):
         
    c = canvas.Canvas(filename, pagesize=letter)
    
    c.setFont("Helvetica-Bold", 16)
    title_width = c.stringWidth(title)
    x_title = (letter[0] - title_width) / 2
    c.drawString(x_title, 750, title) 
    
    y_paragraph = 720 
    c.setFont("Helvetica", 12)
    
    lines = paragraph.split('\n')
    max_paragraph_width = letter[0] - 100 
    
    for line in lines:
        line_width = c.stringWidth(line)
        if y_paragraph <= 50:
            c.showPage()
            c.setFont("Helvetica-Bold", 16)
            c.setFont("Helvetica", 12)
            y_paragraph = 720
        if line_width > max_paragraph_width:
            words = line.split(' ')
            new_line = ''
            for word in words:
                test_line = new_line + word + ' '
                if c.stringWidth(test_line) <= max_paragraph_width:
                    new_line = test_line
                else:
                    c.drawString(50, y_paragraph, new_line.strip())
                    y_paragraph -= 15 
                    new_line = word + ' '
            c.drawString(50, y_paragraph, new_line.strip())
            y_paragraph -= 15  
        else:
            c.drawString(50, y_paragraph, line)
            y_paragraph -= 15      
    c.save()


def create_JSON(title, filename=r'L:\CMR\Backend\out\transcript.pdf'):
    
    json_path = r'L:\CMR\Backend\out\result1.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    c = canvas.Canvas(filename, pagesize=letter)

    tamil_font_path = "Nirmala.ttf"
    pdfmetrics.registerFont(TTFont("TamilFont", tamil_font_path))

    c.setFont("Helvetica-Bold", 16)
    title_width = c.stringWidth(title)
    x_title = (letter[0] - title_width) / 2
    c.drawString(x_title, 750, title)
    c.setTitle(title)

    c.setFont("Helvetica", 12)
    c.setFont("TamilFont", 12) 

    y = 710
    for item in data:
        c.drawString(50, y, "Start: " + str(item['start']))  
        c.drawString(150, y, "End: " + str(item['end']))
        y -= 20

        english_width = c.stringWidth(item['word'])
        tamil_width = c.stringWidth(item['tword'])

        max_width = letter[0] - 100 
        if english_width > max_width :
            english_lines = _wrap_text(c, item['word'], max_width)
            for i in range(len(english_lines)):
                if y <= 50:
                    c.showPage()
                    c.setFont("Helvetica-Bold", 16)
                    c.setFont("Helvetica", 12) 
                    c.setFont("TamilFont", 12) 
                    y = 710  
                c.drawString(50, y, english_lines[i])
                y -= 20
        else:
            c.drawString(50, y, item['word'])
            y -= 20
            
        if  tamil_width > max_width:
            tamil_lines = _wrap_text(c, item['tword'], max_width)
            for i in range(len(tamil_lines)):
                if y <= 50:
                    c.showPage()
                    c.setFont("Helvetica-Bold", 16)
                    c.setFont("Helvetica", 12) 
                    c.setFont("TamilFont", 12) 
                    y = 710  
                c.drawString(50, y, tamil_lines[i])
                y -= 20
        else:
            c.drawString(50, y, item['tword'])  
            y -= 20

        y -= 30
    c.save()

def _wrap_text(c, text, max_width):
    lines = []
    words = text.split()
    line = ''
    for word in words:
        if c.stringWidth(line + ' ' + word) < max_width:
            line += ' ' + word
        else:
            lines.append(line.strip())
            line = word
    lines.append(line.strip())
    return lines