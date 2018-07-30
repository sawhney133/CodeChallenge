'use strict';

//Function to right pad the string
function right_pad(Str, Len) {

    Str = String(Str);
    let i = 0;
    Len = Len - Str.length;
    while (i < Len) {
        Str = Str + " ";

        i++;
    }
    return Str;
}

//Funtion to check input string matches desired schema and valid values and valid datatypes
function is_valid_object(Element) {

    if (Element.constructor == Object) {

        return (Object.keys(Element).length == 2 &&
            Object.keys(Element).indexOf('Name') >= 0 &&a
            typeof Element.Name == 'string' &&
            Object.keys(Element).indexOf('Details') >= 0 &&
            Element.Details.constructor == Object &&
            Object.keys(Element.Details).length == 2 &&
            Object.keys(Element.Details).indexOf('Type') >= 0 &&
            Object.keys(Element.Details).indexOf('Weight') >= 0 &&
            (Element.Details.Type == 'l' || Element.Details.Type == 'k') &&
            typeof Element.Details.Weight == 'number'
        );
    }
    return false;
}

//Function to validate input values
function validate_input(Original_Object) {

    if (Original_Object.constructor == Object && is_valid_object((Original_Object))) {

        return [(Original_Object)];

    }
    else if (Original_Object.constructor == Array && Original_Object.length > 0) {
        for (let i = 0; i < Original_Object.length; i++) {

            if (is_valid_object(Original_Object[i])) {

                continue;

            }
            else {

                return false;
            }

        }

        return Original_Object;
    }

    return false;
}

//Function to convert an element lb to kg
function convert_to_k(Original_Object) {

    var Converted_Object = Original_Object;
    Converted_Object.Details.Type = "k";
    Converted_Object.Details.Weight *= 0.45359237;

    return Converted_Object;

}

//Function to convert a list from lb to kg
function convert_list_to_k(List_of_objects) {

    var Converted_List = [];

    List_of_objects.forEach(function (Original_Object) {

        //If weight type is lb then convert it to kg
        Original_Object.Details.Type == 'l' ? Converted_List.push(convert_to_k(Original_Object)) : Converted_List.push(Original_Object);

    })

    return Converted_List;

}

//Function to find minimum and maximum weight
function find_max_and_min(List) {

    let Sorted_List = List;

    //Bubble Sort
    for (let i = 0; i < Sorted_List.length; i++) {

        for (let j = i + 1; j < Sorted_List.length; j++) {
            if (Sorted_List[i].Details.Weight > Sorted_List[j].Details.Weight) {

                let swap = Sorted_List[i];
                Sorted_List[i] = Sorted_List[j];
                Sorted_List[j] = swap;

            }
        }
    }

    return [Sorted_List[0], Sorted_List[Sorted_List.length - 1]];
}

//Formatted print on console
function print_weight(Converted_List) {

    Converted_List.forEach(function (Converted_Object) {

        console.log(right_pad(Converted_Object.Name, 15),'k', Converted_Object.Details.Weight);
    })
}

//Print maximum and minimum weight
function print_max_and_min(Min, Max) {

    console.log("Max weight was %s k of %s", Max.Details.Weight, Max.Name);
    console.log("Min weight was %s k of %s", Min.Details.Weight, Min.Name);
}

//Function to convert list weight to kg and find minimum/maximum weight in the list -
module.exports.format_weight = function format_weight(List_of_objects) {
    try {
        let Valid_Input = validate_input(List_of_objects);

        if (Valid_Input) {

            var Converted_List = convert_list_to_k(Valid_Input);

            print_weight(Converted_List);

            var result = find_max_and_min(Converted_List);

            print_max_and_min(result[0], result[1]);

            return result;
        }
        else {

            console.log("Invalid Input", List_of_objects);
            return ("Invalid Input");
        }
    }
    catch (error) {

        console.log("Unexpected Error!", error)
        return ("Unexpected Error!", error)
    }
}
